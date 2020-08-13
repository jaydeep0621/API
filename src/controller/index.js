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
        if (getUserByPhoneResponse) {
          const err = {};
          res.send("Phone Number Already Exist");
          console.log("User Already Registered");
        }else{
            let registeruser = await User.save();
            registeruser = registeruser.toObject();

            const token = jwt.sign({
                id:registeruser["_id"],
                name:registeruser["name"]
            })
            console.log(token);
            res.send("Succesffuly Registered");
            console.log("User Deatils is:", User);
        }
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