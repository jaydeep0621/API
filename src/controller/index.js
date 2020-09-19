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
    require: async (req, res, next)=>{
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
            err.resmsg = i18n.__("EMAIL_ALREADY_EXIST");
            err.rescode = i18n.__("responsestatus.ERROR");
            console.log("User Already Registered with Email Id");
        }
        let registerUserResponse = await User.save();
        registerUserResponse = registerUserResponse.toObject();

            const token = jwt.sign({
                id: registerUserResponse["_id"],
                email: registerUserResponse["email"],
                name: registerUserResponse["name"]
            }, "Secret");
            registerUserResponse["token"] = token;

            res.send("Succesffuly Registered");
            console.log("User Details is:", User);
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