const express = require("express");
const router = express.Router();
// const User = require("../models/User");

router.get("/", (req,res) => {
    res.send("api")
});
router.post("/lists", (req,res) => {
    const {title,content} = req.body;
    console.log(title,content);
    const newList = new List({
       title,
       content 
    });
    newList.save()
        .then(list => {
            res.setHeader("Content-Type", "text/html")
            res.json({"_id" : list["_id"] })
        }).catch(err => console.log(err))
});


module.exports = router;