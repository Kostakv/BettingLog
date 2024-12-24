import { useEffect, useState } from "react";
import axios from "axios";
import "./UserBetStatistics.css"

const UserBetStatistics = ({ userId }) => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7000/api/userbets/userStatisticsDetailed/${userId}`,
          { withCredentials: true }
        );
        setStatistics(data);
      } catch (err) {
        setError("Failed to fetch betting statistics.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchStatistics();
    }
  }, [userId]);

  if (loading) return <p>Loading user betting statistics...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="statistics-card">
      <h3 className="statistics-title">User Betting Statistics</h3>
      <p>
        <strong>Average Odds:</strong> {statistics.averageOdds}
      </p>
      <p>
        <strong>Average Bet (Dollars):</strong> ${statistics.averageBetInDollars}
      </p>
      <p>
        <strong>Average Bet (Units):</strong> {statistics.averageBetInUnits}
      </p>
      <p>
        <strong>Most Used Bet Type:</strong> {statistics.mostUsedBetType}
      </p>
    </div>
  );
};

export default UserBetStatistics;
