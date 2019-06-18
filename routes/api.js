const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { ensureAuthenticated } = require("../config/auth");

router.get("/", (req,res) => {
    res.send("api")
});
router.post("/lists", ensureAuthenticated, (req,res) => {
    const {title,content,UserID} = req.body;
    console.log(title,content,UserID);
    User.findById()
});


module.exports = router;