const express = require('express');
const {createAndUpdateRsvp, fetchRsvp}= require('../controllers/rsvpController');
const authVerify =require('../middleware/authVerify');
const rsvpRouter = express.Router();

rsvpRouter.post('/join', authVerify, createAndUpdateRsvp);
rsvpRouter.get('/fetchRsvps',authVerify,fetchRsvp);


module.exports= rsvpRouter;
