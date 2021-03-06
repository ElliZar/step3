const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { ensureAuthenticated } = require("../config/auth");

router.get("/", (req,res) => {
    res.send("api")
});
router.post("/lists", ensureAuthenticated, (req,res) => {
    const {content,UserID} = req.body;
    console.log(content,UserID);
    User.find({_id:UserID})
        .then(data => {
            const doc = data[0];
            console.log(data);
            console.log(content);
            const lists = doc["lists"];
            lists.push(content);
            doc.save(content);
        })
        .catch(err => console.log(err));
    
        
});


module.exports = router;