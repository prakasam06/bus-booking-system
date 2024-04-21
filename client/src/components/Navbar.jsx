import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/JWTAuthContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated,logOut } = useAuth();

  const signOutHandler = async () => {
    await logOut();
  }
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/">
            Booking System
          </a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex="0" role="button" className="btn btn-ghost btn-circle">
            </div>
            <div
              tabIndex="0"
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
            </div>
          </div>
          {isAuthenticated ? (
            <div className="dropdown dropdown-end">
            <div
              tabIndex="0"
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <a onClick={signOutHandler}>Logout</a>
              </li>
            </ul>
          </div>
          ) : (
            <a href="/login">Login</a>
          )}
          
        </div>
      </div>
    </>
  );
};

export default Navbar;
