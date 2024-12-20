"use client";
import "../styleguide.css";
import "../global.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import UserBetsList from "../components/UserBets/UserBetsList";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileResponse = await axios.get(
          "http://localhost:7000/api/users/profile",
          { withCredentials: true }
        );
        setUser(profileResponse.data.user);


        const betsResponse = await axios.get(
          `http://localhost:7000/api/userBets/bets/${profileResponse.data.user.id}`,
          { withCredentials: true }
        );
        setBets(betsResponse.data.bets);
        console.log('Fetch profile: ',profileResponse.data.user.id)
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/login");
      } finally {
        setLoading(false);
        
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:7000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      router.push("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {console.log("Bets being passed to UserBetsList:", bets)}
          <UserBetsList bets={bets} />
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#ff4b5c",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}