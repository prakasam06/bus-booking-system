import axios from "../config/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/JWTAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const handleSubmit = async () => {
    try {
      await signIn(email, password);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err, "error res");
        console.log(err.response.data.error, "error");
        alert(err.response.data.message);
      } else if (err.response && err.response.status === 404) {
        console.log(err.response.data.error, "error");
        alert(err.response.data.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col justify-around items-center h-screen bg-gray-100">
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
          <h1 className="text-3xl font-bold">Login</h1>

          <label className="input input-bordered m-2 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2 8a6 6 0 0112 0v1H2V8zm8-6a6 6 0 00-12 0v1H10V4zm-8 6a6 6 0 0112 0v1H2v-1z" />
            </svg>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="grow"
              placeholder="Email"
            />
          </label>
          <label className="input m-2 input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2 8a6 6 0 0112 0v1H2V8zm8-6a6 6 0 00-12 0v1H10V4zm-8 6a6 6 0 0112 0v1H2v-1z" />
            </svg>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="grow"
              placeholder="Password"
            />
          </label>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Login
          </button>
          <p>
            new user? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
