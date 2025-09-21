import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import API_ROUTES from "./../services/api"; 
import "./../styles/signupPageComponent.css";
import PYM_Logo from "./../assets/PYM_Logo.jpg";

const SignupPageComponent = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Password validation
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }

    // Confirm password validation
    if (e.target.name === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPassword:
          e.target.value !== formData.password ? "Passwords do not match!" : "",
      });
    }
  };

  // Check if token exists in localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // If token exists, redirect to Dashboard
      setTimeout(() => {
        navigate("/dashboard");
      });
    }
  }, [navigate]);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);

    let errorMessage = "";
    if (!minLength) errorMessage += "Password must be at least 8 characters long. ";
    if (!hasUpperCase) errorMessage += "Include at least one uppercase letter. ";
    if (!hasLowerCase) errorMessage += "Include at least one lowercase letter. ";
    if (!hasNumber) errorMessage += "Include at least one number. ";
    if (!hasSymbol) errorMessage += "Include at least one special character (!@#$%^&*). ";

    setErrors({ ...errors, password: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (errors.password || errors.confirmPassword) {
      return;
    }

    try {
      const response = await fetch(API_ROUTES.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          dob: formData.dob,
          password: formData.password,
        }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage(data); // Show success message
        navigate("/login"); // Redirect to login after successful signup
      } else {
        setError(data); // Show error message
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-title">Sign Up</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="input-field"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email ID</label>
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

          <label htmlFor="dob">D-O-B</label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="input-field"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <label htmlFor="confirmPassword">Re-Enter Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="input-field"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </form>
      </div>

      <div className="logo-section">
        <img src={PYM_Logo} alt="Company Logo" className="circle-logo" />
      </div>
    </div>
  );
};

export default SignupPageComponent;
