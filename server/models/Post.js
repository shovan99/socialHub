const mongoose = require("mongoose")


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: ""
    },

    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }],

    like: [{ type: mongoose.Schema.Types.ObjectId , ref: "User" }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


const Post = mongoose.model("Post" , PostSchema)
module.exports = Post