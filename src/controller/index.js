const express = require("express");
const router = express.Router();
const async = require("async");
const i18n = require("i18n");
const jwt = require("jsonwebtoken");
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
        const getUserByEmailResponse = await user.existEmailCheck(User.email);
        if (getUserByPhoneResponse) {
          const err = {};
          res.send("Phone Number Already Exist");
          console.log("User Already Registered with Phone Number");
        }

        if(getUserByEmailResponse){
            const err = {};
            err.resMsg = i18n.__("Email_Already Exist")
            console.log("User Already Registered with Email Id");
            return next(err);
        }

            await User.save();
            res.send("Succesffuly Registered");
            console.log("User Deatils is:", User);
    }
    catch(err){
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