
import React from 'react'
import axios from 'axios';

const BASE_URL = ""
export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'content-type': 'multipart/form-data'},
    withCredentials: true
});
