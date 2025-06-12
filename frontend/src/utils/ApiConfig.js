import axios from 'axios';
const AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json',
    },
});

AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosInstance;

