import React, { useEffect, useState } from "react";
import "./BookieAccounts.css";
import axios from "axios";

const BookieAccountsList = ({ bookieAccounts, user }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (!user || !user.id) {
      console.error("User ID is not available or invalid");
      return;
    }
  
    console.log("Fetching bookie statistics for userId:", user.id);
  
    const fetchStatistics = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7000/api/userbets/statistics/${user.id}`
        );
        console.log("Bookie statistics fetched successfully:", data);
        setStats(data.bookie_statistics || []);
      } catch (error) {
        console.error("Error fetching statistics:", error.message);
      }
    };
  
    fetchStatistics();
  }, [user]);
  
  console.log("Bookie Accounts Data:", bookieAccounts);

  return (
    <div className="cards-container">
      {stats.map((stat, index) => {
        const bookieAccount = bookieAccounts.find(
          (account) => account.bookie_name === stat.bookie_name
        );

        return (
          <div className="card" key={index}>
            <div className="card-header">
              <img
                src={bookieAccount?.logo_url}
                alt={`${stat.bookie_name} Logo`}
                className="bookie-logo"
              />
              <h3>{stat.bookie_name}</h3>
            </div>
            <div className="card-body">
            <p><strong>Balance:</strong> ${bookieAccount?.calculated_balance || "N/A"}</p>
              <p><strong>Initial Deposited:</strong> ${stat.initial_deposited || "N/A"}</p>
              <p><strong>Total Wins:</strong> {stat.total_wins}</p>
              <p><strong>Total Losses:</strong> {stat.total_losses}</p>
              <p><strong>Net Gain/Loss:</strong> ${stat.net_gain_loss ? Number(stat.net_gain_loss).toFixed(2) : "N/A"}</p>
              <p><strong>Win %:</strong> {stat.win_percentage}%</p>
              <p><strong>ROI (Bets):</strong> {stat.roi}%</p>
              <p><strong>ROI (Deposits):</strong> {stat.roi_deposits}%</p>
            </div>
            <div className="card-footer">
              <a
                href={bookieAccount?.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-button"
              >
                Visit Bookie
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookieAccountsList;
