const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/User")
const Post = require("../models/Post")
const requireLogin = require("../middlewares/requireLogin")

router.get("/user/:userId" , requireLogin , ( req , res ) => {
    User.findOne({ _id: req.params.userId })
    .select("-password").then(user => {
        Post.find({ postedBy: req.params.userId })
        .populate("postedBy" , "name _id").exec(( err , post ) => {
           if( err ) {
               return res.status(400).json({ error: "No Post In DB" })
           }
           res.json({ user , post })
        })
    }).catch(err => res.status(400).json({ error: "No User In DB" }))
})

module.exports = router