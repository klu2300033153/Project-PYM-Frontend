import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token and userId from localStorage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");  // Remove userId if it exists

    // Optional: clear other session data if used
    // localStorage.clear();  // Uncomment if you want to clear everything

    // Redirect to home after a short delay
    const timer = setTimeout(() => {
      navigate("/"); // Redirect to home page
    }, 1000); // 1 seconds

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>You have been logged out.</h2>
      <p>Redirecting to Home...</p>
    </div>
  );
};

export default Logout;
