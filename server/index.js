//express
const express = require("express");
const app = express();

//dotenv
require("dotenv").config({path: "./config/.env"});

//db connect
require("./config/database").connectoMongoDB();

//run server
app.listen(process.env.PORT, () => {
    console.log("Server listening on port" +  process.env.PORT);
})