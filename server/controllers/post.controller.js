const postModel = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;

//fetch every post
module.exports.allPosts = async (req, res) => {
    try {
        const docs = await postModel.find().sort({ createdAt: -1 });
        res.status(200).send(docs);
    } catch (err) {
        res.status(400).send("Error to get data: " + err);
    }
};

//fetch one post
module.exports.onePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknown: " + req.params.id);

    try {
        const data = await postModel.findById(req.params.id);
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send("Error to get data: " + err);
    }
};

//search post
module.exports.searchPost = async (req, res) => {
    try {
        const docs = await postModel.find({ title: { $regex: req.params.query, $options: "i" } });
        res.status(200).send(docs);
    } catch (err) {
        res.status(404).send("No post found: " + err);
    }
};

//add one post
module.exports.addPosts = async (req, res) => {
    const newPost = new postModel({
        title: req.body.title,
        author: req.body.author,
        category: req.body.content,
    });

    try {
        const post = await newPost.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json(err);
    }
};