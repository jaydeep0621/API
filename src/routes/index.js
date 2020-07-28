const express = require("express");
const router = express.Router();
const Usercontrol = require("../controller/index");

router.post("./login", Usercontrol.require)

module.exports = {router};