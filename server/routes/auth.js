const express = require("express")
const router = express.Router()

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const { SECRETKEYS } = require("../keys")

const User = require("../models/User")

router.post("/signup" , ( req , res ) => {
    const { name , email , password , role } = req.body
    if( !name || !email || !password ) {
        return res.status(400).json({
            error: "All Fields Are Required"
        })
    }
    User.findOne({ email: email })
    .then(( saveUser ) => {
        if( saveUser ) {
            return res.status(400).json({
            error: "User Email Already Saved"
            })
        }
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(password , salt);
    // const hashedPassword = bcrypt.hash(password , 12)
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        })
        user.save(( errr , user ) => {
            if( errr ) {
            return res.status(400).json({
                error: "User Not Saved DB"
            })
        }
        res.json({
            message: "User Registered"
        })
    })
    }).catch(( err ) => {
        console.log(err)
    })
})

router.post("/signin" , ( req , res ) => {
    const { email , password } = req.body
    if( !email || !password ) {
        return res.status(400).json({
            error: "All Fields Are Required"
        })
    }
    User.findOne({ email: email }).then(( saveUser ) => {
        if( !saveUser ) {
            return res.status(400).json({
                error: "Email Not Registered DB"
            })
        }
        bcrypt.compare(password , saveUser.password)
        .then(( isMatchedd ) => {
            if( isMatchedd ) {
            const token = jwt.sign({ _id: saveUser._id } , SECRETKEYS);

            const { _id , name , email } = saveUser
            res.json({
                token: token,
                user: { _id , name , email }
            })
            }
            else {
                return res.status(400).json({
                    error: "Email Password Not Matchedd"
                })
            }
        })
    })
    .catch(( err ) => {
        console.log(err)
    })
})

module.exports = router