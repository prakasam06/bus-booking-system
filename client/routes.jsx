import React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Navbar from "./src/components/Navbar.jsx";
import Home from "./src/components/Home.jsx";
import SeatChart from "./src/components/SeatChart.jsx";
import Footer from "./src/components/Footer.jsx";
import Register from "./src/components/Register.jsx";
import Login from "./src/components/Login.jsx";
import PrivateRoute from "./src/components/PrivateRoute.jsx";
import Profile from "./src/components/Profile.jsx";

const routes = [
  {
    path: "/",
    element: (
      <>
        <PrivateRoute />
        <Navbar />
        <Home />
        <Footer />
        <PrivateRoute />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Register />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <Profile />
      </>
    ),
  },
  {
    path: "/book/:tripId",
    element: (
      <>
        <Navbar />
        <SeatChart />
      </>
    ),
  },
  
]

export default routes;