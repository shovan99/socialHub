const jwt = require("jsonwebtoken")
const { SECRETKEYS } = require("../keys")

const User = require("../models/User")

const mongoose = require("mongoose")


module.exports = ( req , res , next ) => {
    const { authorization } = req.headers;

    if( !authorization ) {
        return res.status(400).json({
            error: "Unauthorized User"
        })
    }

    const token = authorization.replace("Bearer " , "")
    jwt.verify(token , SECRETKEYS , ( err , payload ) => {
        if( err ) {
            return res.status(400).json({
                error: "Unauthorized User"
            })
        }
        const { _id } = payload;
        User.findById(_id).then(userData => {
            req.user = userData;
            next();
        })
    })
}