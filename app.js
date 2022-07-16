const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bp = require("body-parser");
require("dotenv").config();

app.use(bp.json());

mongoose.connect(
    // "mongodb://127.0.0.1:27017/newDB"
    process.env.MONGO_URI,
    { useNewUrlParser: true }
).then(() => console.log("DB connected"));
mongoose.connection.on("error", err => {
    console.log(`Db connection error": ${err.message}`);
});

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

// middleware
// app.use(morgan("dev"));

app.use("/", postRoutes);
app.use("/", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`A Node Js Api is listening on Port: ${port}`);
});