import React, { useState } from "react";
import "./style.css"; // Updated CSS file

export default function UserBetsList({ bets }) {
  const [selectedBetId, setSelectedBetId] = useState(null);

  const handleBetClick = (betId) => {
    setSelectedBetId(selectedBetId === betId ? null : betId); // Toggle expansion
  };

  const handleDelete = (betId) => {
    console.log("Delete bet:", betId);
    // Add your delete logic here
  };

  const handleUpdate = (betId) => {
    console.log("Update bet:", betId);
    // Add your update logic here
  };

  if (!bets || bets.length === 0) {
    return <p className="no-bets">No bets found.</p>;
  }

  return (
    <div className="bets-container">
      <div className="bets-header">
        <h2 className="bets-title">My Bets</h2>
        <input
          type="text"
          className="bets-search"
          placeholder="Search..."
        />
      </div>
      <table className="bets-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Pick</th>
            <th>Odds</th>
            <th>Amount</th>
            <th>Result</th>
            <th>Return</th>
            <th>Bookie</th>
          </tr>
        </thead>
        <tbody>
          {bets.map((bet) => (
            <React.Fragment key={bet.id}>
              <tr onClick={() => handleBetClick(bet.id)} className="bet-row">
                <td>
                  <div className="event-with-icon">
                    <img
                      src={bet.sport_icon}
                      alt={bet.sport_name}
                      className="sport-icon"
                    />
                    {bet.event_name}
                  </div>
                </td>
                <td>{bet.pick}</td>
                <td>{bet.odds}</td>
                <td>{bet.amount}</td>
                <td
                  className={bet.result === "won" ? "result-won" : "result-lost"}
                >
                  {bet.result}
                </td>
                <td>{bet.return ? Number(bet.return).toFixed(2) : "0.00"}</td>
                <td>{bet.bookie_name}</td>
              </tr>
              {selectedBetId === bet.id && (
                <tr className="bet-expanded">
                  <td colSpan="7">
                    <div className="bet-details">
                      <div className="bet-details-grid">
                        {/* Left Section */}
                        <div className="bet-details-left">
                          <p><strong>Created At:</strong> {new Date(bet.created_at).toLocaleString()}</p>
                          <p><strong>Updated At:</strong> {new Date(bet.updated_at).toLocaleString()}</p>
                        </div>

                        {/* Center Section */}
                        <div className="bet-details-center">
                          <p><strong>Notes:</strong> {bet.notes || "No notes available"}</p>
                        </div>

                        {/* Right Section */}
                        <div className="bet-details-right">
                          <p><strong>Unit Bet:</strong> {bet.units ? `${bet.units}%` : "N/A"}</p>
                          <p><strong>Bookie Balance:</strong> ${bet.bookie_balance ? Number(bet.bookie_balance).toFixed(2) : "N/A"}</p>
                          {bet.units > 5 && (
                            <p className="warning-message">
                              <strong>Warning:</strong> Units exceed 5!
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="bet-actions">
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(bet.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="update-button"
                          onClick={() => handleUpdate(bet.id)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
