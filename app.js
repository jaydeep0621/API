const express = require("express");
const helmet = require("helmet");
const cron = require("cron");
const cors = require("cors");
require("../project3/src/config/db");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const routes = require("../project3/src/routes/index")

const app = express();

const port = process.env.port||3030;
app.use(cors());
app.use(helmet());
/*app.disable('x-powered-by');*/
app.use(bodyparser.json());
app.use("/data", routes);

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

app.get("/", function(req,res){
    res.send("OK");
})

app.listen(port,()=>{
    console.log(`Connected at port ${port}`);
})