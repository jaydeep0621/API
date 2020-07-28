//DataBase Schema
const mongoose = require("mongoose");

const user = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    dob:{
        required : true,
        type: String
    },
    phone:{
        type: String,
        required: true,
        unique: true
    }
})

//export Database Schema
module.exports = mongoose.model("User",user);