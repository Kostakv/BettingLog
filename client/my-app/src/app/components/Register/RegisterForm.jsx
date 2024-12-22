"use client"; // For Next.js client component

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js navigation
import axios from "axios";
import "./style.css";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [responseMessage, setResponseMessage] = useState(""); // For showing success/error messages
  const router = useRouter(); // Initialize the useRouter hook

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password === formData.rePassword) {
      const { username, email, password } = formData;

      console.log("Payload being sent:", { username, email, password });

      try {
        const response = await axios.post("http://localhost:7000/api/auth/register", {
          username,
          email,
          password,
        });

        console.log("Server Response:", response.data); // Log the backend response
        setResponseMessage("Registration Successful!"); // Display success message

        // Redirect to login page after successful registration
        setTimeout(() => {
          router.push("/login"); // Use Next.js router to navigate
        }, 1500); // Optional delay to show the success message
      } catch (error) {
        let errorMessage = "Something went wrong!";
        if (error.response) {
          errorMessage = error.response.data?.message || "An unknown error occurred";
        } else if (error.request) {
          errorMessage = "No response received from server";
        } else {
          errorMessage = error.message;
        }

        setResponseMessage("Error: " + errorMessage);
      }
    } else {
      setResponseMessage("Error: Passwords do not match!");
    }
  };

  return (
    <div className="modern-center-container">
      <form className="modern-frame" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Your Account</h2>

        {/* Username Field */}
        <div className="input-group">
          <label htmlFor="username" className="input-label">Username</label>
          <input
            type="text"
            id="username"
            className="input-field"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        {/* Email Field */}
        <div className="input-group">
          <label htmlFor="email" className="input-label">Email</label>
          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Field */}
        <div className="input-group">
          <label htmlFor="password" className="input-label">Password</label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Re-enter Password Field */}
        <div className="input-group">
          <label htmlFor="rePassword" className="input-label">Re-enter Password</label>
          <input
            type="password"
            id="rePassword"
            className="input-field"
            placeholder="Re-enter your password"
            value={formData.rePassword}
            onChange={handleChange}
          />
        </div>

        {/* Sign-Up Button */}
        <button type="submit" className="submit-button">
          Sign Up
        </button>

        {/* Response Message */}
        {responseMessage && <p className="response-message">{responseMessage}</p>}

        <p className="footer-text">
          Already have an account? <span className="login-link">Login</span>
        </p>
      </form>
    </div>
  );
};
