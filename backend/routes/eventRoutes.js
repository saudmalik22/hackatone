 const express = require("express");
 const {fetchEvents, createEvents, updateEvents, deleteEvents, fetchUpcomingEvents, fetchPastEvents, fetchEventsByCategory, fetchEventsByDate, fetchBySearch,singleEvent, createAndUpdateRsvp} = require("../controllers/eventController");
const authVerify = require("../middleware/authVerify");
const eventRouter = express.Router();


eventRouter.get("/fetch",authVerify, fetchEvents);

eventRouter.post("/create",authVerify, createEvents);

eventRouter.put("/update/:id", authVerify,  updateEvents);

eventRouter.delete("/delete/:id", authVerify, deleteEvents);

eventRouter.get("/upcomming", authVerify, fetchUpcomingEvents);
eventRouter.get("/past", authVerify, fetchPastEvents); 
eventRouter.get("/fetchDate", authVerify, fetchEventsByDate);
eventRouter.get("/fetchCategory", authVerify, fetchEventsByCategory);
eventRouter.get("/fetchSearch", authVerify, fetchBySearch);
eventRouter.get("/single/:id", authVerify, singleEvent);


module.exports=eventRouter;