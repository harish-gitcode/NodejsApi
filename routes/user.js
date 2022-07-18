const router= require('express').Router();
const {home,Signup,getAllUsers}=require("../controller/user");
const {userValidator}=require("../validate");

router.get("/",home);
router.post("/",userValidator,Signup);
router.get("/users",getAllUsers);

module.exports=router;