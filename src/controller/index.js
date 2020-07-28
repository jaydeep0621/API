const express = require("express");
const router = express.Router();
const async = require("async");
const user = require("../model/user");
const bodyparser = require("body-parser");
router.use(bodyparser.json());
const mongoose = require("mongoose");


module.exports = {
    require: async (req,res)=>{
        try{
        const User = new user(req.body);
        User.name = req.body.name;
        User.dob =  req.body.dob;
        User.phone = req.body.phone;
        console.log("Name is :",User.name);
        console.log("Date of Birth is :",User.dob);
        console.log("Phone Number is :",User.phone);
        await User.save();
        res.send(User);
        } catch(err){
            console.log("Error is:", err);
        }
    }
}