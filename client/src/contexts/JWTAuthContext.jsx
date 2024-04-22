import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../config/axios";
import { useNavigate, useLocation } from "react-router-dom";

const JWTAuthContext = createContext();

export const useAuth = () => useContext(JWTAuthContext);

const me = async () => {
  try { 
    const res = await axios.get("users/me");
    console.log(res.data);
    return res.data;
  }catch(error){
    console.log(error,"error");
    alert("error occured");
  }
};

const JWTAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accesstoken, setaccessToken] = useState("");
  const [refreshTokenExpired, setrefreshTokenExpired] = useState(false);
  const [accessTokenExpired, setaccessTokenExpired] = useState(false);
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    function getnewToken() {
      if (accessTokenExpired) {
        axios.get("users/auth").then((res) => {
          if (res.data.status === 200) {
            console.log(res.data, "res.data from auth endpoint");
            setaccessToken(res.data.accessToken);
            setaccessTokenExpired(false);
          } else {
            alert("error occured");
          }
        });
      }
    }
    getnewToken();
  }, [accessTokenExpired]);

  useEffect(() => {
    console.log(location.pathname, "pathname");
    if (location.pathname === "/register") {
      setIsLoading(false);
      Navigate("/register");
      return;
    }
    me()
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(res.data.isAuthenticated);
        setrefreshTokenExpired(res.data.isRefreshTokenExpired);
        setIsLoading(false);
        if (res.data.isRefreshTokenExpired || !res.data.isAuthenticated) {
          Navigate("/login");
        }
        if (location.pathname === "/") {
          Navigate("/");
        }
      })
      .catch((err) => {
        Navigate("/login");
        setIsLoading(false);
        setError(err);
      });
  }, []);

  const signIn = async (email, password) => {
    const res = await axios.post("/users/signin", {
      email: email,
      password: password,
    });
    console.log(res);
    try {
      if (res.data.status === 200) {
        setaccessToken(res.data.accessToken);
        setaccessTokenExpired(false);
        setIsAuthenticated(true);
        setIsLoading(false);
        setError("");
        Navigate("/");
      }
    } catch (err) {
      console.log(err, "errror");
      if (err.response && err.status === 400) {
        console.log(err, "error res");
        console.log(err.response.data.error, "error");
        alert(err.response.data.error);
      } else if (err.response && err.status === 404) {
        console.log(err.response.data.error, "error");
        alert(err.response.data.error);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const logOut = async () => {
    const res = await axios.post("/users/logout");
    console.log(res);
    if (res.status === 204) {
      setaccessToken("");
      setaccessTokenExpired(false);
      setIsAuthenticated(false);
      setIsLoading(false);
      setError("");
      Navigate("/");
    } else {
      setIsLoading(false);
      setError(res.data.error);
    }
  };

  const register = async (
    email,
    firstName,
    lastName,
    password,
    confirmPassword
  ) => {
    console.log(email, firstName, lastName, password, confirmPassword);
    const res = await axios.post("/users/signup", {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      confirmPassword: confirmPassword,
    });
    console.log(res);
    if (res.data.status === 200) {
      setaccessTokenExpired(false);
      setIsAuthenticated(true);
      setIsLoading(false);
      setError("");
      Navigate("/login");
    } else {
      setIsLoading(false);
      setError(res.data.error);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <JWTAuthContext.Provider
      value={{
        signIn: signIn,
        logOut: logOut,
        register: register,
        accessToken: accesstoken,
        accessTokenExpired: accessTokenExpired,
        user: user,
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        error: error,
        setaccessToken: setaccessToken,
        setaccessTokenExpired: setaccessTokenExpired,
        setUser: setUser,
        setIsAuthenticated: setIsAuthenticated,
        setIsLoading: setIsLoading,
        setError: setError,
        navigate: navigate,
      }}
    >
      {children}
    </JWTAuthContext.Provider>
  );
};

export default JWTAuthProvider;
