import axios from "axios";


const instance = axios.create({

  baseURL: "https://bus-booking-system.onrender.com/api/v1/",
  withCredentials: true,
  responseType: "json",
});

export default instance;

// https://bus-booking-system.onrender.com/api/v1/