import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const apiUrl = 'http://localhost:3000/events';


export const addEvent = createAsyncThunk(
  'event/addEvent',
  async (eventData) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    console.log('Event Data:', eventData);
    try {
      const response = await axios.post(`${apiUrl}/create`, eventData, {
        headers: { 
          Authorization: `Bearer ${token}` 
        }     
      });
      console.log('Event added:', response.data);
      return response.data;
    } catch (error) {  
      console.error('Error:', error);
    }
  }
);


export const fetchEvents = createAsyncThunk(
  'event/fetchEvents',
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/fetch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userId },
      });
      console.log('Events fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
export const fetchPastEvents = createAsyncThunk(
  'event/fetchPastEvents',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/past`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Past Events:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching past events:", error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Fetch Upcoming Events
export const fetchUpcomingEvents = createAsyncThunk(
  'event/fetchUpcomingEvents',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/upcomming`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Upcoming Events:", response.data);
      return response.data; 
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const fetchEventsByCategory = createAsyncThunk(
  'event/fetchEventsByCategory',
  async (category, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/fetchCategory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { category },
      });
      console.log('Events by category:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching events by category:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const fetchEventsByDate = createAsyncThunk(    
  'event/fetchEventsByDate',    
  async (date, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/fetchDate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { date },
      });
      console.log('Events by date:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching events by date:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const fetchBySearch =createAsyncThunk(
  'event/fetchBySearch',  
  async (searchTerm, ) => {  
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${apiUrl}/search`, {
        headers: {  
          Authorization: `Bearer ${token}`,
        },
        params: { search: searchTerm },
      });
      console.log('Events by search:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching events by search:', error);
    }
  });

  export const fetchSingleEvent = createAsyncThunk(
    'event/fetchSingleEvent',
    async (eventID, { rejectWithValue }) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/single/${eventID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response in slice", response)
        return response.data; 
      } catch (error) {
        console.error("Error in slice", error);
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );

  export const updateEvent = createAsyncThunk(
    'event/updateEvent',
    async (eventData) => {
      console.log('Event Data in slice:', eventData);
      const token = localStorage.getItem('token');
      try {
        const response = await axios.put(`${apiUrl}/update/${eventData._id}`, eventData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Event updated:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error updating event:', error);
      }
    }
  );

  export const deleteEvent =createAsyncThunk(
    'event/deleteEvent',
    async(_id)=>{
      const token = localStorage.getItem('token')
       try{
         const response = await axios.delete(`${apiUrl}/delete/${_id}`,{
          headers:{
            Authorization: `Bearer ${token}`,
          },
           
         })
         console.log("response in delete slice", response);
         return response.data;
       }catch(error){
        console.log("delete error in slice",error)
       }
    }
  )




const initialState = {
  events: [],
  event:null,
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
        state.events = [action.payload].concat(state.events);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("API Response:", action.payload);
        state.events = action.payload || [];
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
     
      .addCase(fetchPastEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPastEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload; 
      })
      .addCase(fetchPastEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload; 
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.event = action.payload; // Store the event data here
    })
    .addCase(fetchSingleEvent.rejected, (state, action) => {      
      state.isLoading = false;
      state.error = action.payload;
    })
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
    .addCase(deleteEvent.fulfilled, (state, action) => {
      state.isLoading = false;
    
      // Convert the object of events to an array (if it's not already)
      const eventsArray = Object.values(state.events);
    
      // Filter out the event that matches the deleted ID
      state.events = eventsArray.filter(event => event._id !== action.payload._id);
    });
  },
});

export default eventSlice.reducer;
