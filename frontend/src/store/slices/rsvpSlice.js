import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3000/rsvp";

// Thunk to create or update RSVP
export const createAndUpdateRsvp = createAsyncThunk(
  "rsvp/join",
  async ({ userID, eventID }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${apiUrl}/join/`,
        { userID, eventID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // Return response data for reducer
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred while processing RSVP"
      );
    }
  }
);

// Thunk to fetch RSVPs for a specific event
export const fetchRsvpByEvent = createAsyncThunk(
  "rsvp/fetchRsvpByEvent",
  async (eventID, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${apiUrl}/fetchRsvps`, {
        params: { eventID },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        console.log("response in slice in rsvp", response);
      return response.data; // Return only the data property
    } catch (error) {
      console.error("Error fetching RSVP:", error);
      return rejectWithValue(
        error.response?.data?.message || "An error occurred while fetching RSVPs"
      );
    }
  }
);

// Initial state
const initialState = {
  rsvps: [], // List of RSVPs
  loading: false, // Loading state
  error: null, // Error state
};

// Slice definition
const rsvpSlice = createSlice({
  name: "rsvp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createAndUpdateRsvp
      .addCase(createAndUpdateRsvp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAndUpdateRsvp.fulfilled, (state, action) => {
        state.loading = false;
        state.rsvp = [...state.rsvp, action.payload]; // Add new RSVP to the list
      })
      .addCase(createAndUpdateRsvp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create/update RSVP";
      })

      // Handle fetchRsvpByEvent
      .addCase(fetchRsvpByEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRsvpByEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.rsvps = action.payload; // Replace RSVP list with fetched data
      })
      .addCase(fetchRsvpByEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch RSVPs";
      });
  },
});

export default rsvpSlice.reducer;
