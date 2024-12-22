"use client";

import "../styleguide.css";
import "../global.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import UserBetsList from "../components/UserBets/UserBetsList";

export default function Analytics() {
  const [user, setUser] = useState(null);
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const { data: profileData } = await axios.get(
          "http://localhost:7000/api/users/profile",
          { withCredentials: true }
        );
        setUser(profileData.user);

        // Fetch user bets
        const { data: betsData } = await axios.get(
          `http://localhost:7000/api/userBets/bets/${profileData.user.id}`,
          { withCredentials: true }
        );
        setBets(betsData.bets);
      } catch (error) {
        if (error.response?.status === 404) {
          setErrorMessage(
            "No bets found. Start placing your first bets!"
          );
        } else if (error.response?.status === 401) {
          console.error("Unauthorized access, redirecting to login.");
          router.push("/login");
        } else {
          console.error("Error fetching data:", error);
          setErrorMessage("An error occurred while fetching data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Analytics</h1>
      {user ? (
        <div>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {errorMessage ? (
            <p style={{ color: "red" }}>{errorMessage}</p>
          ) : (
            <UserBetsList bets={bets} />
          )}
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}
