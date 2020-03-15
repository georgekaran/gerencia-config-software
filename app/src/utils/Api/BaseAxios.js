import axios from "axios";
import { BASE_URL } from "../variables";

const Axios = axios.create({
  baseURL: BASE_URL,
});

Axios.interceptors.request.use(async config => {
  const token = undefined;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

Axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    window.location = '/login';
  } else {
    return Promise.reject(error);
  }
});

export default Axios;