const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb Connected Successfully");
    } catch(error){
        console.error("MongoDb Connection Failed",error.message);
        process.exit(1);
    }
}
module.exports = connectDB;