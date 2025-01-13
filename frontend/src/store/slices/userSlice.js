import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import apiClient from '../../utils/apiClient'; // Import the configured Axios instance
import axios from 'axios';
// Register Thunk

const apiUrl = 'http://localhost:3000/auth';
export const register = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/register`, userData);
            const { token, user } = response.data;
            
            // Save the token to localStorage
            localStorage.setItem('token', token);
            

            return { user, token };
        } catch (error) {
            console.error('Registration error:', error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);


// Login Thunk
export const login = createAsyncThunk(
    'user/login',
    
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post( `${apiUrl}/login`, credentials);
            const { token, user } = response.data;
            console.log('Token received:', response.data.token);
            console.log('User ID:', response.data);
            // Save token to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem("user", JSON.stringify(user));
            console.log('User ID:', user.id);

            return { user, token };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state,action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                console.log('User:', action.payload.user);
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
