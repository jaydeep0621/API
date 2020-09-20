const express = require("express");
const helmet = require("helmet");
const cron = require("cron");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv").config();
const i18n = require("i18n");
const routes = require("../project3/src/routes/index");
require("./src/config/db");

const app = express();

const port = process.env.PORT;
app.use(cors());
app.use(helmet());
/*app.disable('x-powered-by');*/
app.use(bodyparser.json());

app.use("/data", routes);

//intialize i18n dependency
i18n.configure({
    locales: "en",
    directory: __dirname + "/src/locales",
  }); 

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    i18n.init(req,res);
    next();
})

app.use((err, req, res, next) => {
    // if(AppConfig.ENV != "production"){
    //   console.error("Error is::", err);
    // }
    return res.status(500).json(err);
    // return Utility.response(
    //   res,
    //   {},
    //   err.resMsg,
    //   err.status || httpStatus.INTERNAL_SERVER_ERROR,
    //   // err.resCode || i18n.__("responseStatus.FAILURE"),
    //   {
    //     msg: err.message || err.resMsg
    //   },
    // );
  });
  

app.get("/", function(req,res){
    res.send("OK");
})

app.listen(port,()=>{
    console.log(`Connected at port ${port}`);
})

//Export App File
module.exports =  app;