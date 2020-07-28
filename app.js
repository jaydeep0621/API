const express = require("express");
const helmet = require("helmet");
require("../project3/src/config/db");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const routes = require("../project3/src/routes/index")

const app = express();

const port = process.env.port||3030;
app.use(helmet());
app.disable('x-powered-by');
app.use(bodyparser.json());
app.use("/data", routes);

app.get("/", function(req,res){
    res.send("OK");
})

app.listen(port,()=>{
    console.log(`Connected at port ${port}`);
})