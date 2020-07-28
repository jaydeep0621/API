const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser")
const Usercontrol = require("../controller/index");
router.use(bodyparser.json());

router.post("/login", Usercontrol.require)

router.get("/login", async(req,res)=>{
    res.send("Get Login Work");
})

module.exports = router;