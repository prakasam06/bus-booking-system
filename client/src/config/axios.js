import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  withCredentials: true,
  responseType: "json",
});

export default instance;

// https://bus-booking-system.onrender.com/api/v1/
