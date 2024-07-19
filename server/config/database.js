const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

module.exports.connectoMongoDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB");
    }catch (err) {
        console.log("Error connecting to MongoDB");
        process.exit(1); // Exit process si echoue
    }
};