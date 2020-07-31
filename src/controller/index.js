const express = require("express");
const router = express.Router();
const async = require("async");
const i18n = require("i18n");
const bcrypt = require("bcrypt");
const user = require("../model/user");
const bodyparser = require("body-parser");
router.use(bodyparser.json());
const mongoose = require("mongoose");


module.exports = {
    require: async (req,res)=>{
        try{
        const User = new user(req.body);
        const getUserByPhoneResponse = await user.existPhoneCheck(User.phone);
        if (getUserByPhoneResponse) {
          const err = {};
          res.send("PHONE_ALREADY_EXISTS");
        }
        let registerUserResponse = await User.save();
        registerUserResponse = registerUserResponse.toObject();

    }catch(err){
        console.log("Error is:", err);
    }
},

//Update User
 
edit: async (req,res)=>{
    try{
        const User = new user(req.body);
        User._id = req.user.id;
        console.log("User id is :", User._id);

    }catch(err){
        res.json("Something Went Wrong");
    }
}
}