
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL 
export default axios.create({
    baseURL: baseURL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers: {'content-type': 'multipart/form-data'},
    withCredentials: true
});
