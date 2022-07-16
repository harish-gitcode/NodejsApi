const express = require('express');
const {Signup} = require("../controller/auth");


const router = express.Router();
router.post("/signup",Signup);

module.exports=router;