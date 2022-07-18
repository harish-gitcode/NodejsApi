const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.loginPage=function(req,res){
    res.json({login:"Enter your detail to login"});
}

exports.login = (req, res) => {
    // const userExist=User.findOne({email:req.body.email});
    //other mehtod to find user based on the email 
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(404).json({
                error: "User with that email doesn't exist. Try Signin"
            });
        }     
        //check if the email and password match (use authenticate method in user model )
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Incorrect password "
            })
        }
        //generate a token with user and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        //persist the token in cookie with some expiry time

        res.cookie("tok", token, { expire: new Date() + 7200 });

        //return response with user and token to front-end client
        const {name, email } = user;

        return res.json({ token, user: {name, email } });
    });
};

exports.logout= (req, res) => {
    res.clearCookie("tok");
    return res.json({message:"Signout success! "})
}
