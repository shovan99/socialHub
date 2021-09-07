const express = require("express")
const router = express.Router()

const requireLogin = require("../middlewares/requireLogin")

const Post = require("../models/Post")

router.post("/createpost" , requireLogin , ( req , res ) => {
    const { title , description , picc } = req.body
    if( !title || !description ) {
        return res.status(400).json({
            error: "All Fields Are Required"
        })
    }
    req.user.password = undefined
    const post = new Post({
        title: title,
        description: description,
        postedBy: req.user,
        photo: picc
    })

    post.save().then(( savePost ) => {
        res.json({
            message: savePost
        })
    }).catch(( err ) => {
        console.log(err)
    })
})

router.get("/allposts" , requireLogin , ( req , res ) => {
    Post.find({}).populate("postedBy", "_id name")
    .populate("comments" , "_id name")
    .then(( posts ) => {
        res.json({posts})
    }).catch(( err ) => {
        console.log(err)
    })
})


router.get("/mypost" , requireLogin , ( req , res ) => {
    Post.find({ postedBy: req.user._id }).populate("postedBy" , "_id name")
    .then(( myPost ) => {
        res.json({ myPost })
    }).catch(( err ) => {
        console.log(err)
    })
})


router.put("/like" , requireLogin , ( req , res ) => {

    Post.findByIdAndUpdate(req.body.postId , {
        $push: {like: req.user._id}
    }, {
        new: true
    })
    .populate("postedBy" , "_id name")
    .exec(( err , result ) => {
        if( err ) {
            return res.status(400).json({
                error: "Like Errors"
            })
        }
        res.json(result)
    })
})


router.put("/dislike" , requireLogin , ( req , res ) => {
    Post.findByIdAndUpdate(req.body.postId ,{
        $pull: {like: req.user._id}
    } , {
        new: true
    })
    .populate("postedBy" , "_id name")
    .exec(( err , result ) => {
        if( err ) {
            return res.status(400).json({
                error: "Dislike Errors"
            })
        }
        res.json(result)
    })
})

router.put("/comment" , requireLogin , ( req , res ) => {
    const { text } = req.body
    if( !text ) {
        return res.status(400).json({
            error: "All Fields Are Required"
        })
    }
    const comment = {
        text: text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    } , {
        new: true
    })
    .populate("postedBy" , "_id name")
    .populate("comments.postedBy" , "_id name")
    .exec(( err , result ) => {
        if( err ) {
            return res.status(400).json({
                error: "Comment Error"
            })
        }
        res.json(result)
    })
})


router.get("/postbyid/:postId" , requireLogin , ( req , res ) => {
    Post.findById(req.params.postId)
    .populate("postedBy" , "_id name").populate("comments.postedBy" , "_id name")

    .exec(( err , result ) => {
        if( err ) {
            return res.status(400).json({
                error: "Post Error"
            })
        }
        res.json(result)
    })
})

router.delete("/deletepost/:postId" , requireLogin , ( req , res ) => {
    Post.findOne({ _id: req.params.postId })
    .populate("postedBy" , "_id name")
    .exec(( err , post ) => {
        if( err || !post ) {
            return res.status(400).json({
                error: "No Post Is Found"
            })
        }
        if( post.postedBy._id.toString() === req.user._id.toString() ) {
            post.remove().then( result => res.json(result) ).catch(err => console.log(err))
        }
    })
    // const post = Post.findById(req.params.postId)
    // if( !post ) {
    //     return res.status(400).json({
    //         error: "No Post In DB"
    //     })
    // }
    // post.remove()
    // .then(( err , result ) => {
    //     if( err ) {
    //         return res.status(400).json({
    //             error: "Post Is Not Deleted"
    //         })
    //     }
    //     res.json(result)
    // })
})

module.exports = router