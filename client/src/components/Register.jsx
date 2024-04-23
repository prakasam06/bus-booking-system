import axios from "../config/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/JWTAuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(email, firstName, lastName, password, confirmPassword);
    try {
      await register(email, firstName, lastName, password, confirmPassword);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err, "error res");
        console.log(err.response.data.error, "error");
        alert(err.response.data.error);
      } else if (err.response && err.response.status === 404) {
        console.log(err.response.data.error, "error");
        alert(err.response.data.error);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg font-medium">Loading...</div>
        </div>
      ) : (
        <div className="flex flex-col justify-around items-center h-screen bg-gray-100">
          <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold">Register</h1>

            <label className="input input-bordered m-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
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
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                className="grow"
                placeholder="Firstname"
              />
            </label>
            <label className="input m-2 input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                className="grow"
                placeholder="Lastname"
              />
            </label>
            <label className="input m-2 input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="grow"
                placeholder="Password"
              />
            </label>
            <label className="input m-2 input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="grow"
                placeholder="ConfirmPassword"
              />
            </label>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Register
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
