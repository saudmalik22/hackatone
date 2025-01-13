const  mongoose= require('mongoose');

const rsvpSchema= new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },
      attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }],
      rsvpCount: {
        type: Number,
        default: 0,
      },
})

const Rsvp = mongoose.model("Rsvp", rsvpSchema);

module.exports =Rsvp;