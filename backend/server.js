const express = require("express");
const app = express();
const cors = require('cors')
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/DB");
const todoRoutes = require('./routes/todoRoute');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = process.env.PORT || 8000;

// initialize app
dotenv.config();
connectDB();

// Routes
app.use("/todos",todoRoutes);
app.use("/auth",authRoutes);
app.use("/products",productRoutes);


app.listen(port, () => {
    console.log("backend is running")
})