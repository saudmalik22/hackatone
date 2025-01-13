import {configureStore} from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';
import userReducer from './slices/userSlice';
import rsvpReducer from './slices/rsvpSlice'
const store = configureStore({
    reducer: {
        user: userReducer,
        event: eventReducer,
        rsvp:rsvpReducer
    }
});
export default store;