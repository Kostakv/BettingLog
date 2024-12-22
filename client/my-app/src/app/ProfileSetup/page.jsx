"use client"; // For Next.js client component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./ProfileSetup.css";

export default function ProfileSetup() {
  const [formData, setFormData] = useState({
    location: "",
    favorite_sport: "",
  });

  const [user, setUser] = useState(null); // Store user data fetched from the session
  const [bookieAccounts, setBookieAccounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from the session
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/users/profile", {
          withCredentials: true,
        });
        setUser(response.data.user);
        console.log("User fetched from session:", response.data.user);
      } catch (error) {
        console.error("Error fetching user from session:", error);
        setErrorMessage("Failed to fetch user data. Please try again.");
      }
    };

    fetchUser();
  }, []);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddBookie = () => {
    setBookieAccounts([
      ...bookieAccounts,
      { bookie_id: "", deposited_amount: "", current_balance: "" },
    ]);
  };

  const handleBookieChange = (index, field, value) => {
    const updatedAccounts = [...bookieAccounts];
    updatedAccounts[index][field] = value;
    setBookieAccounts(updatedAccounts);
  };

  const handleRemoveBookie = (index) => {
    const updatedAccounts = bookieAccounts.filter((_, i) => i !== index);
    setBookieAccounts(updatedAccounts);
  };

  const validateForm = () => {
    console.log("Validating form data:", formData);
    console.log("Validating bookie accounts:", bookieAccounts);

    if (!formData.location || !formData.favorite_sport) {
      setErrorMessage("Location and favorite sport must be completed.");
      return false;
    }

    if (bookieAccounts.length === 0) {
      setErrorMessage("You must add at least one bookie.");
      return false;
    }

    for (let i = 0; i < bookieAccounts.length; i++) {
      const account = bookieAccounts[i];
      if (!account.bookie_id) {
        setErrorMessage(`Bookie is missing for account ${i + 1}.`);
        return false;
      }
      if (!account.deposited_amount || account.deposited_amount <= 0) {
        setErrorMessage(`Deposited amount must be greater than 0 for account ${i + 1}.`);
        return false;
      }
      if (!account.current_balance || account.current_balance <= 0) {
        setErrorMessage(`Current balance must be greater than 0 for account ${i + 1}.`);
        return false;
      }
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    if (!validateForm()) {
      console.log("Validation failed. Fix the errors before submitting.");
      return;
    }

    if (!user) {
      setErrorMessage("User data not available. Please try again.");
      return;
    }

    try {
      const payload = {
        user_id: user.id, // Use the correct user ID from the logged-in session
        ...formData,
        bookie_accounts: bookieAccounts,
      };
      console.log("Payload:", payload);

      const response = await axios.post(
        "http://localhost:7000/api/user/setup-profile",
        payload,
        { withCredentials: true }
      );

      setSuccessMessage("Profile setup completed successfully!");
      console.log("Profile setup response:", response.data);

      router.push("/profile");
    } catch (error) {
      console.error(
        "Error setting up profile:",
        error.response?.data || error.message
      );
      setErrorMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="profile-setup-container">
      <h1 className="profile-setup-title">Profile Setup</h1>
      <p className="profile-setup-subtitle">Complete your profile to get started!</p>

      <form onSubmit={handleSubmit} className="profile-setup-form">
        <div className="form-group">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleFormChange}
            placeholder="Enter your location"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="favorite_sport" className="form-label">
            Favorite Sport
          </label>
          <select
            id="favorite_sport"
            value={formData.favorite_sport}
            onChange={handleFormChange}
            required
            className="form-select"
          >
            <option value="">Select a sport</option>
            <option value="Soccer">Soccer</option>
            <option value="Basketball">Basketball</option>
            <option value="Football">Football</option>
          </select>
        </div>

        <div className="bookie-section">
          <h3 className="bookie-section-title">Bookie Accounts</h3>
          {bookieAccounts.map((account, index) => (
            <div key={index} className="bookie-card">
              <div className="form-group">
                <label htmlFor={`bookie_id_${index}`} className="form-label">
                  Bookie
                </label>
                <select
                  id={`bookie_id_${index}`}
                  value={account.bookie_id}
                  onChange={(e) =>
                    handleBookieChange(index, "bookie_id", e.target.value)
                  }
                  required
                  className="form-select"
                >
                  <option value="">Select a bookie</option>
                  {["1", "2", "3"].map(
                    (bookie_id) =>
                      !bookieAccounts.some((acc) => acc.bookie_id === bookie_id) ||
                      account.bookie_id === bookie_id ? (
                        <option key={bookie_id} value={bookie_id}>
                          {bookie_id === "1"
                            ? "Betway"
                            : bookie_id === "2"
                            ? "DraftKings"
                            : "FanDuel"}
                        </option>
                      ) : null
                  )}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor={`deposited_amount_${index}`} className="form-label">
                  Deposited Amount
                </label>
                <input
                  type="number"
                  id={`deposited_amount_${index}`}
                  value={account.deposited_amount}
                  onChange={(e) =>
                    handleBookieChange(index, "deposited_amount", e.target.value)
                  }
                  placeholder="Enter deposited amount"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`current_balance_${index}`} className="form-label">
                  Current Balance
                </label>
                <input
                  type="number"
                  id={`current_balance_${index}`}
                  value={account.current_balance}
                  onChange={(e) =>
                    handleBookieChange(index, "current_balance", e.target.value)
                  }
                  placeholder="Enter current balance"
                  required
                  className="form-input"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveBookie(index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddBookie}
            className="add-button"
          >
            Add Bookie
          </button>
        </div>

        <button type="submit" className="submit-button">
          Complete Profile
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}
