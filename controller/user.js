const User = require("../models/user");
const _=require("lodash");

exports.home = function (req, res) {
    res.json({ page: "Home" });
};

exports.getAllUsers = (req, res) => {
    //here we can also use the select function to get email,name and joined
    User.find({},(err,user)=>{
        if(err) return res.json({err});
        const all=user.map((val)=>{
            const {_id,email,name,Joined,updated} = val;
            return {_id,email,name,Joined,updated}
        });
        return res.json(all);
    });
};
exports.getProfile=(req,res)=>{
    req.profile.hashed_password=undefined
    req.profile.salt=undefined
    return res.json(req.profile);
}

exports.userByid = (req,res,next,id) => {
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({ error: "User not found"});
        }
    req.profile = user; //add profile object in req  with user info
    req.profile.hashPassword = undefined;
    req.profile.salt = undefined;
    next();
    });
};
exports.updateUser=(req,res,next)=>{
    let user=req.profile
    user=_.extend(user,req.body);
    user.updated=Date.now();

    user.save((err)=>{
        if(err) return res.status(400).json({ error: "You are not authorized to update this user"});
    
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({user});
    });
}

exports.deleteUser=(req,res,next)=>{
    let user=req.profile;

    user.remove((err,user)=>{
        if(err) return res.status(400).json({err});

        res.json({message:"User deleted Successfully"});
    })
}


exports.Signup = (req, res,next) => {
     User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.json(err);
        if (user) return res.status(403).json({ error: "User with this email id exists" });
    });
    const user = new User(req.body);
    user.save((err,usr)=>{
        if (err) return res.json(err);
        // res.status(200).json({ message: "Singup success! Please login" }); //we can use json({user});
        const { name, email} = usr;
        return res.json({ name,email,status:"Successfully Registered"});
    });
    
};