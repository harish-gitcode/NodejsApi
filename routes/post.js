const express = require('express');
const {getPosts,createPost}=require("../controller/post");
const {PostValidator}=require("../validate")//no need to add index as it is automatically loaded

const router=express.Router();

router.get("/",getPosts);
router.post("/post",PostValidator,createPost);

module.exports=router;