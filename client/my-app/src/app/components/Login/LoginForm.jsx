"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../AuthContext";
import "../Register/style.css";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const { setUser } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await axios.post(
        "http://localhost:7000/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      const { user } = response.data;
      setUser(user); // Update AuthContext
      console.log("User logged in. Current user state:", user); // Debug log
      setResponseMessage("Login Successful!");
      router.push(user.isProfileSetUp ? "/Analytics" : "/ProfileSetup");
    } catch (error) {
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
        <button type="submit" className="submit-button">Login</button>
        {responseMessage && <p className="footer-text">{responseMessage}</p>}
        <p className="footer-text">
          Don’t have an account? <span className="login-link">Sign up today</span>
        </p>
      </form>
    </div>
  );
}
