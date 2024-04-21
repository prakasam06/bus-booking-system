import axios from "axios";


const instance = axios.create({

  baseURL: "https://bus-booking-system.vercel.app/api/v1/",
  withCredentials: true,
  responseType: "json",
});

export default instance;
