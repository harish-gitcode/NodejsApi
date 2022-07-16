const Post = require("../models/post");

exports.getPosts = (req, res) => {

    const posts = Post.find().select("_id title body")
        .then((posts) => {
            res.status(200).json({ posts })//when key and value have same we don't need to write twice
        })
        .catch(err => console.error(err));
};

exports.createPost = (req, res) => {
    const post = new Post(req.body);
    // console.log("Creating POST: ",req.body);
    // if (err) {
    //     return res.status(400).json({ error: err });
    // // } //since we are handling the error in validate we don't need this anymore
    // res.status(200).json({
    //     post: result
    // });
    post.save().then(result => {
        res.status(200).json({
            post: result
        });
    });

};