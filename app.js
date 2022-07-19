const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const expressValidator = require('express-validator');
const cors=require('cors');
app.use(bp.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

mongoose.connect(
    // "mongodb://127.0.0.1:27017/newDB"
    process.env.MONGO_URI,
    { useNewUrlParser: true }
).then(() => console.log("DB connected"));
mongoose.connection.on("error", err => {
    console.log(`Db connection error": ${err.message}`);
});

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/session");
const {err} = require("./controller/auth");
const userRoutes = require("./routes/user");
const useridRoutes = require("./routes/userid");

// middleware
// app.use(morgan("dev"));

app.use(postRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(useridRoutes);
app.use(err);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`A Node Js Api is listening on Port: ${port}`);
});