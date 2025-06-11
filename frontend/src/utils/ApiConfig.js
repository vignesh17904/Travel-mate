import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();
// Create an Axios instance with default configuration
const AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add a request interceptor
AxiosInstance.interceptors.request.use(
    (config) => {
        // Example: Attach token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Add a response interceptor
AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        return Promise.reject(error);
    }
);

export default AxiosInstance;