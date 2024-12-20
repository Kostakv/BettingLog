"use client"; // For Next.js client component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import Axios
import "../Register/style.css"; 

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      // Send login request to the server with Axios
      const response = await axios.post(
        "http://localhost:7000/api/auth/login",
        { username, password }, // Payload
        { withCredentials: true } // Ensures cookies are sent with the request
      );

      // Handle successful response
      setResponseMessage("Login Successful!");
      console.log("Login response:", response.data);

      // Redirect to the profile page
      router.push("/profile");
    } catch (error) {
      // Handle error response
      console.error("Error during login:", error.response?.data || error.message);
      setResponseMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="modern-center-container">
      <form className="modern-frame" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>

        {/* Username Input */}
        <div className="input-group">
          <label htmlFor="username" className="input-label">Username</label>
          <input
            type="text"
            id="username"
            className="input-field"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <label htmlFor="password" className="input-label">Password</label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Login</button>

        {/* Response Message */}
        {responseMessage && <p className="footer-text">{responseMessage}</p>}

        {/* Footer Text */}
        <p className="footer-text">
          Don’t have an account? <span className="login-link">Sign up today</span>
        </p>
      </form>
    </div>
  );
}
