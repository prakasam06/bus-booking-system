import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import  JWTAuthProvider  from "./contexts/JWTAuthContext";
import Register from "./components/Register.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <JWTAuthProvider>
        <App />
      </JWTAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

