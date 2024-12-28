const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:String,
    email: {
        required: true,
        unique: true,
        type: String
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
    }


})


const User = mongoose.model("User", userSchema);

module.exports =User;