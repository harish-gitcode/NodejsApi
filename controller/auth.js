const { expressjwt: eJwt } = require("express-jwt");
require("dotenv").config();

exports.hasAuth = function (req, res,next) {
    const authorized = req.auth && req.profile && req.auth._id == req.profile._id;

    if (!authorized) {
        res.status(403).json({ error: "User is not authorized to perform this action" })
    }
    next();
};

exports.auth = eJwt({
    secret: process.env.JWT_SECRET, algorithms: ["HS256"], userProperty: "auth"
});

exports.err=function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Unauthorized" });
    }
};

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ0MjM2NzliOTZkM2M4MGM0MGMwNjQiLCJpYXQiOjE2NTgwNjk5OTJ9.J6pegoyX7Y04Rzk7K7FR7JoMNVjSTdFK8XteEQ3T8i0"