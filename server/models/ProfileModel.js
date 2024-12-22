const { db } = require('../db');

// Insert or update user profile
const upsertProfile = async (userId, location, favoriteSport) => {
  const query = `
    INSERT INTO user_profiles (user_id, location, favorite_sport)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id)
    DO UPDATE SET
      location = EXCLUDED.location,
      favorite_sport = EXCLUDED.favorite_sport,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;
  const values = [userId, location, favoriteSport];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Insert or update bookie accounts
const upsertBookieAccounts = async (userId, bookieAccounts) => {
  const results = [];

  for (const account of bookieAccounts) {
    const query = `
      INSERT INTO user_bookie_accounts (user_id, bookie_id, initial_balance, current_balance)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, bookie_id)
      DO UPDATE SET
        initial_balance = EXCLUDED.initial_balance,
        current_balance = EXCLUDED.current_balance,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;
    const values = [
      userId,
      account.bookie_id,
      parseFloat(account.deposited_amount),
      parseFloat(account.current_balance),
    ];

    const result = await db.query(query, values);
    results.push(result.rows[0]);
  }

  return results;
};

module.exports = { upsertProfile, upsertBookieAccounts };
