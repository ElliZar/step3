const express = require("express");
const router = express.Router();
// const {ensureAuthenticated} = require("../config/auth");
const List = require("../models/List");
router.get("/", (req,res) => {
    res.render("dashboard",{});
});

router.get("/lists" , (req,res) => {
    res.render("listPage");
});

router.get("/lists/:id" , (req,res) => {
    const id = "5d076e6acf0ada30ed06d280";
    List.findOne({_id: id})
        .then(list => {
            res.send(list);
        })
});

// router.post("/lists" , (req,res) => {
//     const {listTitle} = req.body;
//     console.log(listTitle);
//     res.redirect("/dashboard",);
// });

module.exports = router;