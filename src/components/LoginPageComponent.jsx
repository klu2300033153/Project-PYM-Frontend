import React, { useState, useEffect } from "react";
import API_ROUTES from "./../services/api"; // Import API routes
import { useNavigate } from "react-router-dom"; // Use the navigate hook
import "./../styles/loginPageComponent.css";
import PYM_Logo from "./../assets/PYM_Logo.jpg";

const LoginPageComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Check if token or userId exists in localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      setTimeout(() => {
        navigate("/dashboard");
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch(API_ROUTES.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mailId: formData.email, // match Spring Boot's field name
          password: formData.password,
        }),
      });

      const data = await response.json(); // expecting { message: "...", userId: ... }

      if (response.ok && data.userId !== -1) {
        // Store login details in localStorage
        localStorage.setItem("jwtToken", "dummyToken"); // You can use real JWT later
        localStorage.setItem("userId", data.userId); // ✅ Save userId
        setMessage(data.message);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server Error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="signin-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <div className="forgot-password">Forgot password?</div>

          <button type="submit" className="login-btn">
            Login →
          </button>
        </form>
      </div>

      <div className="logo-section">
        <img src={PYM_Logo} alt="Play Your Mood Logo" className="circle-logo" />
      </div>
    </div>
  );
};

export default LoginPageComponent;
