"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./Navbar.css";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  console.log("Navbar user state:", user);
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:7000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      console.log("User logged out. Current user state:", null);
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link href="/">MyApp</Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/Tools">Tools</Link>
          </li>
          <li>
            <Link href="/Guides">Guides</Link>
          </li>
          <li>
            <Link href="/Community">Community</Link>
          </li>
          <li>
            <Link href="/Analytics">Analytics</Link>
          </li>
          {user ? (
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
