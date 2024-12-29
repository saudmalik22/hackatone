import axios from 'axios';

// Create an axios instance with base configuration
export const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // Your API base URL
});

// Add interceptor to include token in all requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle request errors
    }
);

export default apiClient;
