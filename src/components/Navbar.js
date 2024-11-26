import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useLogout } from "./LogoutContext";

const Navbar = () => {

  const { loggedOut, logOut } = useLogout();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand">
          🎬 MovieBooking
        </Link>
      </div>
      <div className="navbar-links">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>

          <li>
            <Link to="/about">About Us</Link>
          </li>

          {loggedOut && <li>
            <Link to="/signup">Login/Register</Link>
          </li>}

          {!loggedOut && <li>
            <Link to="/booked-shows">Booked Shows</Link>
          </li>}
        </ul>
      </div>
      <div className="navbar-user">
        <button onClick={logOut}>Logout</button>
      </div>

    </nav>
  );
};

export default Navbar;
