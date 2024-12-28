

const mongoose= require("mongoose");



const todoSchema= new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
    },
    createdAt:{
        type: Date, default: Date.now
    }
})

const todos =  mongoose.model("todos", todoSchema,);

module.exports = todos;