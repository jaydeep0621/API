const express = require("express");
const router = express.Router();
const async = require("async");
const i18n = require("i18n");
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

        //to check phone number validity
        await User.save((err,data)=>{
            if(data){
                console.log("Your Data has been successfully saved");
                console.log(User);
                res.send(User);
            }
            else{
                console.log("Phone Number Already Registered");
                res.send("Already Registered");            
            }
        });
        } catch(err){
            console.log("Error is:", err);
        }
    }
}