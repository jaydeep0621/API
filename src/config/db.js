//DB Connection

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/user", {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true});

mongoose.connection
.then(() => {
    console.log("DB Successfully Connected");
},(err)=> {
    console.log("Error is :", err);
})