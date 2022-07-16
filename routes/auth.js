const express = require('express');
const {Signup} = require("../controller/auth");
const {userValidator}= require("../validate")


const router = express.Router();
router.post("/signup",userValidator,Signup);

module.exports=router;