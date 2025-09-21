import React from "react";
import "./../styles/headerComponent.css";
import { Link } from "react-router-dom";
import PYMLogo from "./../assets/PYM_Logo.jpg";

import defaultProfileImage from "./../assets/defaultProfile.png"; // Default profile image

const Header = ({ isLoggedIn = false, profileImage = null }) => {
  // Override isLoggedIn based on JWT token in localStorage
  const token = localStorage.getItem("jwtToken");
  isLoggedIn = !!token;

  return (
    <header className="header-container">
      <div className="header-box">
        <div className="logo-container">
          <div className="logo-circle">
            <img src={PYMLogo} alt="Play Your Mood Logo" className="logo" />
          </div>
          <a href="/" style={{ textDecoration: "none" }}>
            <h1 className="title">PLAY YOUR MOOD</h1>
          </a>
        </div>
      </div>
      <nav className="nav-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        ) : (
          <>
            {/* <input type="text" placeholder="Search..." className="search-bar" /> */}
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <img
              src={profileImage || defaultProfileImage}
              alt="Profile"
              className="profile-img"
            />
            {/* <Link to="/logout" className="nav-link">Logout</Link> */}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
