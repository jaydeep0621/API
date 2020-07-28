//DataBase Schema

const mongoose = require("mongoose");

const user = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email:{
        required : true,
        type: String
    },
    phone:{
        type: String,
        required: true
    }
})


//export Database Schema
module.exports = mongoose.model("User",user);