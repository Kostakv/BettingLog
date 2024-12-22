const { db } = require('../db'); // Replace with your DB connection utility

const UserBetsController = {
  async create(req, res) {
    try {
      const {
        user_id,
        sport_id,
        sport_category,
        event_name,
        pick,
        bettype,
        odds,
        amount,
        bookie_id,
        notes,
      } = req.body;

      const query = `
        INSERT INTO userBets (
          user_id, sport_id, sport_category, event_name, pick, bettype, odds, amount, bookie_id, notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *, 
                  (SELECT current_balance FROM user_bookie_accounts WHERE user_id = $1 AND bookie_id = $9) AS remaining_balance
      `;

      const values = [
        user_id,
        sport_id,
        sport_category,
        event_name,
        pick,
        bettype,
        odds,
        amount,
        bookie_id,
        notes,
      ];

      const { rows } = await db.query(query, values);

      res.status(201).json({ bet: rows[0] });
    } catch (error) {
      console.error('Error creating bet:', error.message);
      res.status(500).json({ message: 'Error creating bet', error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const query = `
        SELECT 
          ub.*, 
          s.name AS sport_name, 
          s.icon_url AS sport_icon, -- Include the sport icon URL
          b.name AS bookie_name
        FROM userBets ub
        JOIN sports s ON ub.sport_id = s.id
        JOIN bookies b ON ub.bookie_id = b.id
        ORDER BY ub.bet_date DESC
      `;

      const { rows } = await db.query(query);
      res.status(200).json({ bets: rows });
    } catch (error) {
      console.error('Error fetching all bets:', error.message);
      res.status(500).json({ message: 'Error fetching bets', error: error.message });
    }
  },

  async getById(req, res) {
    const { id } = req.params;

    try {
      const query = `
        SELECT 
          ub.*, 
          s.name AS sport_name, 
          s.icon_url AS sport_icon, -- Include the sport icon URL
          b.name AS bookie_name
        FROM userBets ub
        JOIN sports s ON ub.sport_id = s.id
        JOIN bookies b ON ub.bookie_id = b.id
        WHERE ub.id = $1
      `;

      const { rows } = await db.query(query, [id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Bet not found' });
      }

      res.status(200).json({ bet: rows[0] });
    } catch (error) {
      console.error('Error fetching bet:', error.message);
      res.status(500).json({ message: 'Error fetching bet', error: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      sport_id,
      sport_category,
      event_name,
      pick,
      bettype,
      odds,
      amount,
      result,
      bookie_id,
      notes,
    } = req.body;

    try {
      const query = `
        UPDATE userBets
        SET sport_id = $1, sport_category = $2, event_name = $3, pick = $4,
            bettype = $5, odds = $6, amount = $7, result = $8, bookie_id = $9, notes = $10,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $11
        RETURNING *
      `;

      const values = [
        sport_id,
        sport_category,
        event_name,
        pick,
        bettype,
        odds,
        amount,
        result,
        bookie_id,
        notes,
        id,
      ];

      const { rows } = await db.query(query, values);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Bet not found' });
      }

      res.status(200).json({ bet: rows[0] });
    } catch (error) {
      console.error('Error updating bet:', error.message);
      res.status(500).json({ message: 'Error updating bet', error: error.message });
    }
  },

  async remove(req, res) {
    const { id } = req.params;

    try {
      const query = `DELETE FROM userBets WHERE id = $1 RETURNING *`;
      const { rows } = await db.query(query, [id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Bet not found' });
      }

      res.status(200).json({ message: 'Bet deleted successfully' });
    } catch (error) {
      console.error('Error deleting bet:', error.message);
      res.status(500).json({ message: 'Error deleting bet', error: error.message });
    }
  },

  async getByUserId(req, res) {
    const { userId } = req.params;
  
    try {
      const query = `
        SELECT 
          ub.*, 
          s.name AS sport_name, 
          s.icon_url AS sport_icon, 
          b.name AS bookie_name, 
          b.logo_url AS bookie_logo, 
          b.website_url AS bookie_website, 
          uba.current_balance AS bookie_balance, 
          ROUND((ub.amount / uba.current_balance) * 100, 2) AS units
        FROM userBets ub
        JOIN sports s ON ub.sport_id = s.id
        JOIN bookies b ON ub.bookie_id = b.id
        JOIN user_bookie_accounts uba ON ub.user_id = uba.user_id AND ub.bookie_id = uba.bookie_id
        WHERE ub.user_id = $1
        ORDER BY ub.bet_date DESC
      `;
      const { rows } = await db.query(query, [userId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "No bets found for this user." });
      }
  
      res.status(200).json({ bets: rows });
    } catch (error) {
      console.error("Error fetching bets for user:", error.message);
      res.status(500).json({ message: "Error fetching bets", error: error.message });
    }
  }
};

module.exports = UserBetsController;
