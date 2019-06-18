const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
const { forwardAuthenticated } = require('../config/auth');
router.get("/login", forwardAuthenticated,(req,res) => {
    res.render("login");
});

router.post("/login", (req,res,next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login"
    })(req,res,next)
});

router.get("/register",forwardAuthenticated, (req,res) => {
    res.render("register");
});

router.post("/register",(req,res) => {
    const {name,email,password,password2} = req.body;
    let errors = [];

    //check required fields
    if(!name || !email || !password ||!password2){
        errors.push({msg:"Please fill in all fields"});
    }
    //chack passwords match
    if(password !== password2){
        errors.push({msg: "Passwords do not match"});
    }
    //check pass length
    if(password.length < 6 || password.length > 16){
        errors.push({msg: "Password should be greater then 6 but not greater then 16"});
    }

    if(errors.length > 0){
        res.render("register", {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        // Validation passed
        User.findOne({email:email})
            .then(user => {
                if(user){
                    //User exists
                    errors.push({msg: "Email is already registered"})
                    res.render("register", {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
                else{
                    const newUser = new User({
                        name,
                        email,
                        password,
                    });
                    //Hash password
                    bcrypt.genSalt(10,(err,salt)=>{
                        bcrypt.hash(newUser.password,salt,(err,hash) => {
                            if(err){
                                throw err;
                            }else{
                                newUser.password = hash;
                            }
                            
                            newUser.save()
                                .then(user => {
                                    req.flash("success_msg", "You are now registered and can log in");
                                    res.redirect("/users/login");
                                })
                                .catch((err) => console.log(err));
                        });
                    })
                }
            })
            .catch((err) => console.log(err));
    }
});
router.get("/logout", (req,res) => {
    req.logout();
    res.redirect("/users/login");
});
module.exports = router;