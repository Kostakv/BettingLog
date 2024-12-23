import React from "react";
import "./UserStatsCard.css";

const UserStatsCard = ({ userStats }) => {
  if (!userStats) {
    return null;
  }

  return (
    <div className="card user-card">
      <h2>Total User Statistics</h2>
      <div className="card-body">
        <p><strong>Total Balance:</strong> ${userStats.total_balance || "N/A"}</p>
        <p><strong>Total Deposited:</strong> ${userStats.total_deposited || "N/A"}</p>
        <p><strong>Total Wins:</strong> {userStats.total_wins || 0}</p>
        <p><strong>Total Losses:</strong> {userStats.total_losses || 0}</p>
        <p><strong>Win %:</strong> {userStats.win_percentage || 0}%</p>
        <p><strong>ROI (Bets):</strong> {userStats.roi_based_on_bets || 0}%</p>
        <p><strong>ROI (Deposits):</strong> {userStats.roi_based_on_deposits || 0}%</p>
        <p><strong>Total Profit:</strong> ${userStats.total_profit || "N/A"}</p>
      </div>
    </div>
  );
};

export default UserStatsCard;
