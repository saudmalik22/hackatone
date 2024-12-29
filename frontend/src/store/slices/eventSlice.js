import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { jwtDecode } from "jwt-decode"; // Correct import

const apiUrl = 'http://localhost:3000/events';

// Add Event
export const addEvent = createAsyncThunk(
  "event/addEvent",
  async (eventData, { rejectWithValue }) => {
    console.log("Event Data Sent:", eventData);

    // Validate eventData before sending
    const requiredFields = ["title", "date", "location", "category", "visibility"];
    for (const field of requiredFields) {
      if (!eventData[field]) {
        return rejectWithValue(`The field "${field}" is required.`);
      }
    }

    try {
      // Retrieve and decode the token to extract user ID
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("User not logged in.");
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id || decodedToken._id;

      // API Request
      const response = await axios.post(
        `${apiUrl}/create`,
        {
          ...eventData,
          created_by: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error creating event:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch Events
export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("User not logged in.");
      }

      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update Event
export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async ({ eventId, eventData }, { rejectWithValue }) => {
    console.log("Event Data to Update:", eventData);

    try {
      // Retrieve and decode the token to extract user ID
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("User not logged in.");
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id || decodedToken._id;

      // API Request to update event
      const response = await axios.put(
        `${apiUrl}/update/${eventId}`,
        {
          ...eventData,
          updated_by: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating event:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete Event
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("User not logged in.");
      }

      const response = await axios.delete(`${apiUrl}/delete/${eventId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return eventId; // Return eventId to be used for removing it from state
    } catch (error) {
      console.error("Error deleting event:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  events: [],
  isLoading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Event
      .addCase(addEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Event
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.events.findIndex((event) => event._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = state.events.filter((event) => event._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
