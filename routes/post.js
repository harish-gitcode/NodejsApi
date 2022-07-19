const router = require('express').Router();
const { 
    getPosts,
    createPost,
    postByuser,
    postById,
    deletePost,
    updatePost,
    isAuthor } = require("../controller/post");
const { PostValidator } = require("../validate")//no need to add index as it is automatically loaded
const { userByid } = require("../controller/user");
const { auth} = require("../controller/auth");


router.get("/posts", getPosts);
router.post("/post/:id", auth, createPost, PostValidator);
router.param("id", userByid);
router.get("/post/:id", auth,postByuser);
router.param("postID", postById);
router.delete("/post/:postID",auth,isAuthor,deletePost);
router.put("/post/:postID", auth,isAuthor,updatePost);

module.exports = router;