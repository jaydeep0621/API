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
    }
})
user.static({
    getUserList(reqobj, sort){

        return this.aggregate([{
            $match: {isDeleted: false}
        }])

    },
    existPhoneCheck(phone){
        return this.findOne({ phone: phone});
      },

    UpdateById(reqobj){
      return this.findOneAndUpdate({
               _id:reqobj._id
      },{
          $set: reqobj
      })
    }
})

//export Database Schema
module.exports = mongoose.model("User",user);