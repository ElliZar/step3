const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/",ensureAuthenticated, (req,res) => {
    const list = req.user.lists;

    // for(let i = 0; i < list.length; i++){
    //     console.log(list[i]);
    // }
    res.render("dashboard", {user: req.user._id, list});
});

router.get("/lists" ,ensureAuthenticated, (req,res) => {
    res.render("listPage",{user: req.user._id});
});

router.get("/lists/:id" , (req,res) => {
    const id = "5d076e6acf0ada30ed06d280";
    
});

// router.post("/lists" , (req,res) => {
//     const {listTitle} = req.body;
//     console.log(listTitle);
//     res.redirect("/dashboard",);
// });

module.exports = router;