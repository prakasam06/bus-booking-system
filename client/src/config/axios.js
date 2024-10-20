import axios from "axios";

const instance = axios.create({
  baseURL: "http://35.170.11.221:8000/api/v1/",
  withCredentials: true,
  responseType: "json",
});

export default instance;

// https://bus-booking-system.onrender.com/api/v1/
