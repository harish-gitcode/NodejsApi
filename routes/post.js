const router = require('express').Router();
const {getPosts,createPost}=require("../controller/post");
const {PostValidator}=require("../validate")//no need to add index as it is automatically loaded
const {userByid}= require("../controller/user");
const {auth,hasAuth}=require("../controller/auth");


router.get("/post",getPosts);
router.post("/post/:id",auth,createPost,PostValidator);
router.param("id",userByid);

module.exports=router;