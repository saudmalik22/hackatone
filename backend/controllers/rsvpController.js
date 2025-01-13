const { find } = require('../models/eventModal');
const Rsvp = require('../models/rsvpModel');

const createAndUpdateRsvp = async (req, res) => {
    const { userID, eventID } = req.body;

    if (!userID || !eventID) {
        return res.status(400).json({ message: "User ID and Event ID are required" });
    }

    try {
        // Find the RSVP for the given event and populate attendees
        let rsvp = await Rsvp.findOne({ event: eventID }).populate('attendees', 'name email');

        if (!rsvp) {
            // If no RSVP exists, create a new one
            rsvp = new Rsvp({
                event: eventID,
                attendees: [userID],
                rsvpCount: 1,
            });
        } else {
            // Check if user is already in the attendee list
            const alreadyRSVPed = rsvp.attendees.some((attendee) => attendee._id.toString() === userID);

            if (alreadyRSVPed) {
                return res.status(400).json({ message: "User already RSVPed to this event" });
            }

            // Add user to the attendee list and increment the RSVP count
            rsvp.attendees.push(userID);
            rsvp.rsvpCount += 1;
        }

        // Save the RSVP document
        await rsvp.save();

        console.log(`User ${userID} RSVPed for event ${eventID}`);
        return res.status(200).json({ message: "RSVP successful", rsvp });
    } catch (err) {
        console.error("Error RSVPing for event:", err);
        return res.status(500).json({ message: "Error RSVPing for event", error: err.message });
    }
};


const fetchRsvp = async (req, res) => {
    try {
        const { eventID } = req.query; // Get eventID from query params
        const rsvp = await Rsvp.findOne({ event: eventID }).populate('attendees', 'name email'); // Populate attendee details

        if (!rsvp) {
            return res.status(404).json({
                data: null,
                status: "error",
                message: "No RSVP data found for this event",
            });
        }

        res.json({
            data: rsvp,
            status: "success",
        });
    } catch (error) {
        res.json({
            data: null,
            status: "error",
            error: error.message,
        });
    }
};


module.exports = { 
    createAndUpdateRsvp,
    fetchRsvp
 };
