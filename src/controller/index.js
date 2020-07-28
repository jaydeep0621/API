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
        await User.save();
        res.send(User);
        }
        catch(err){
            console.log("Error is:", +err);
        }
    }
}