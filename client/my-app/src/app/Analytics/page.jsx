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
  const [bookieAccounts, setBookieAccounts] = useState([]);
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
        console.log("User profile data:", profileData.user);

        // Fetch user bets
        const { data: betsData } = await axios.get(
          `http://localhost:7000/api/userBets/bets/${profileData.user.id}`,
          { withCredentials: true }
        );
        setBets(betsData.bets);
        console.log("User bets data:", betsData.bets);

        // Fetch bookie accounts
        const { data: accountsData } = await axios.get(
          `http://localhost:7000/api/userBets/analytics/${profileData.user.id}`,
          { withCredentials: true }
        );
        setBookieAccounts(accountsData.accounts);
        console.log("Bookie accounts data:", accountsData.accounts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("An error occurred while fetching analytics data.");
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