//express
const express = require("express");
const app = express();

// Middlewares
const cors = require('cors');
app.use(cors());
app.use(express.json());

//dotenv
require("dotenv").config({path: "./config/.env"});

//db connect
require("./config/database").connectToMongoDB();

//json parsing
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
const postRoutes = require("./routes/post.routes.js");
app.use("/", postRoutes);

//run server
app.listen(process.env.PORT, () => {
    console.log("Server listening on port " +  process.env.PORT);
})