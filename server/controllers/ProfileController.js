const ProfileModel = require('../models/ProfileModel');
const { db } = require('../db');

const ProfileController = {
  async setupProfile(req, res) {
    try {
      const { user_id, location, favorite_sport, bookie_accounts } = req.body;

      // Validate incoming user_id against session userId
      if (req.session.userId !== user_id) {
        console.error(
          `Mismatched user_id in session and request: session userId: ${req.session.userId}, request user_id: ${user_id}`
        );
        return res.status(403).json({ message: 'User mismatch in profile setup.' });
      }

      if (!user_id || !location || !favorite_sport || !Array.isArray(bookie_accounts) || bookie_accounts.length === 0) {
        return res.status(400).json({ message: 'All fields are required, including at least one bookie account.' });
      }

      console.log("Incoming request body:", req.body);

      // Upsert the profile
      const profile = await ProfileModel.upsertProfile(user_id, location, favorite_sport);
      console.log("Profile upsert result:", profile);

      // Upsert bookie accounts
      const bookieAccounts = await ProfileModel.upsertBookieAccounts(user_id, bookie_accounts);
      console.log("Bookie accounts upsert result:", bookieAccounts);

      // Update `is_profile_set_up` to true
      const updateUserQuery = `
        UPDATE users
        SET is_profile_set_up = true
        WHERE id = $1
        RETURNING id, username, email, is_profile_set_up;
      `;
      const { rows } = await db.query(updateUserQuery, [user_id]);
      const updatedUser = rows[0];

      if (!updatedUser || !updatedUser.is_profile_set_up) {
        console.error("Database update failed. Rows returned:", rows);
        return res.status(500).json({ message: 'Failed to update user profile status.' });
      }

      console.log("Database state after profile setup update:", updatedUser);

      // Update the session directly
      if (req.session && req.session.user) {
        req.session.user.isProfileSetUp = updatedUser.is_profile_set_up;
        console.log("Updated session after profile setup:", req.session.user);
      } else {
        console.warn("No active session found to update.");
      }

      res.status(201).json({
        message: 'Profile setup completed successfully.',
        profile,
        bookieAccounts,
      });
    } catch (error) {
      console.error('Error setting up profile:', error.message);
      res.status(500).json({ message: 'Error setting up profile', error: error.message });
    }
  },
};

module.exports = { ProfileController };