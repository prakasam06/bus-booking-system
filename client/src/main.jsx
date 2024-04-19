import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import SeatChart from './components/SeatChart.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<>
    <Navbar/>
    <Home/>
    </> 
    ,
  },
  {
    path: "/book/:tripId",
    element:<>
    <Navbar/>
    <SeatChart/>
    </> 
    ,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
