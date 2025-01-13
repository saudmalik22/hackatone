const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true, 
  },
  location: {
    type: String,
    required: true, 
  },
  category: {
    type: String,
    enum: ['conference', 'workshop', 'seminar', 'tech','meetup','webinar'],
    required: true,
  },
  visibility: {
    type: String,
    enum: ["public", "private"], 
    required: true,
    default: "Public",
  },
  image: {
    type: String, 
    required: true, 
  },
    created_by: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
      
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
