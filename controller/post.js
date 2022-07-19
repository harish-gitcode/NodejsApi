const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");


exports.isAuthor=(req,res,next)=>{

    let isAuth = (req.auth&&req.post&&req.auth._id==req.post.Author._id.toString());
    console.log(isAuth)
    if (!isAuth) {
        res.status(403).json({ error: "User is not authorized to perform this action" })
    }
    next();
}

exports.getPosts = (req, res) => {

    const posts = Post.find()
        .populate("Author", "_id name")
        .select("_id title body")
        .then((posts) => {
            res.status(200).json({ posts })//when key and value have same we don't need to write twice
        })
        .catch(err => console.error(err));
};

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ errors: "Image couldn't be uploaded" });
        }
        let post = new Post(fields)

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.Author = req.profile
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({ err });
            }
            res.json(result);

        })

    })

    // console.log("Creating POST: ",req.body);
    // if (err) {
    //     return res.status(400).json({ error: err });
    // // } //since we are handling the error in validate we don't need this anymore
    // res.status(200).json({
    //     post: result
    // });
    // post.save().then(result => {
    //     res.status(200).json({
    //         post: result
    //     });
    // });

};

exports.postByuser = (req, res) => {
    Post.find({ Author: req.profile._id })
        .populate("Author", "_id name")
        .sort("_created")
        .exec((err, posts) => {
            if (err) return res.status(400).json({ err });
            return res.json({ posts });
        });
};
exports.postById = (req, res, next, postID) => {
    Post.findById(postID)
        .populate("Author", "_id name")
        .exec((err, post) => {
            if (err || !post) return res.status(400).json({ err });

            req.post = post;
            next();
        });
    

}

exports.updatePost = (req, res) => {

    let post = req.post;
    post = _.extend(post, req.body);
    post.save((err) => {
        if (err) return res.status(400).json({ error: "You are not authorized to update this user" })
        res.json({ post });
    })
};

exports.deletePost = (req, res) => {

    let post = req.post
    console.log(post);
    post.remove((err, post) => {
        if (err) return res.status(400).json({ err });

        res.json({ message: "Post deleted Successfully" });
    })

}