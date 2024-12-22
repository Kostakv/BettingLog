"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/users/profile", {
          withCredentials: true,
        });
        setUser(response.data.user);
        console.log("User fetched from server:", response.data.user);
      } catch (error) {
        console.error("Error fetching user from server:", error.message);
        setUser(null); // Assume logged-out state if there's an error
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
