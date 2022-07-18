const Post = require("../models/post");
const formidable=require("formidable");
const fs=require("fs");

exports.getPosts = (req, res) => {

    const posts = Post.find().select("_id title body")
        .then((posts) => {
            res.status(200).json({ posts })//when key and value have same we don't need to write twice
        })
        .catch(err => console.error(err));
};

exports.createPost = (req, res,next) => {
    let form= new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({ errors:"Image couldn't be uploaded"});
        }
        let post= new Post(fields)

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.Author=req.profile
        if(files.photo){
             post.photo.data=fs.readFileSync(files.photo.path);
             post.photo.contentType=files.photo.type;
        } 
        post.save((err,result)=>{
            if(err){
               return  res.status(400).json({err});
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