import React from "react";
import { Link } from "react-router-dom";

import "../styles/MenuComponent.css"; // Assuming you have a CSS file for styling

const MenuComponent = () => {
  return (
    <nav className="dashboard-menu">
      <h3>Menu</h3>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        {/* <li><Link to="/editProfile">Edit</Link></li> */}
        {/* <li><Link to="/settings">Settings</Link></li> */}
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default MenuComponent;
