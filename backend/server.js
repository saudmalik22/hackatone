const express = require("express");
const app = express();
const cors = require('cors')
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/DB");
const eventRouter = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const rsvpRouter= require('./routes/rsvpRoutes');
dotenv.config();
//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = process.env.PORT || 8000;

// initialize app

connectDB();

// Routes
app.use("/events",eventRouter);
app.use("/auth",authRoutes);
app.use("/rsvp", rsvpRouter);



app.listen(port, () => {
    console.log("backend is running")
})