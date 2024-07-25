const mongoose = require("mongoose");

//Shéma de la donnée
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            maxLength: 200,
        },
        author: {
            type: String,
            maxLength: 200,
        },
        category: {
            type: String,
            maxLength: 200,
        },
        content: {
            type: String,
            maxLength:2000000,
        },
    },
//Ajout une date de création pour chaque post
    { timestamps: true} 
);

module.exports = mongoose.model("post", postSchema);