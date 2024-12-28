const mongoose = require("mongoose");


const connectDB = async ()=>{
    try {

        // console.log(process.env.DB_URl ,"Db url is here")
         await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected to todosApp database");
    }catch (e){
         console.log("error is in db",e);
    }
}

module.exports = connectDB;