const { db } = require('../db'); // Replace with your DB connection utility

const userBetsController = {
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
        INSERT INTO userbets (
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
          b.name AS bookie_name,
          ub.net_gain_loss -- Include net gain/loss in response
        FROM userbets ub
        JOIN sports s ON ub.sport_id = s.id
        JOIN bookies b ON ub.bookie_id = b.id
        ORDER BY ub.bet_date DESC
      `;

      console.log("Executing Query: ", query);
      console.log("With Values: ", [userId]); // Log the parameter values
  
      const { rows } = await db.query(query);
      res.status(200).json({ bets: rows });
    } catch (error) {
      console.error('Error fetching all bets:', error.message);
      res.status(500).json({ message: 'Error fetching bets', error: error.message });
    }
  }
  ,

  async getById(req, res) {
    const { id } = req.params;
  
    try {
      const query = `
        SELECT 
          ub.*, 
          s.name AS sport_name, 
          s.icon_url AS sport_icon, -- Include the sport icon URL
          b.name AS bookie_name,
          ub.net_gain_loss -- Include net gain/loss in response
        FROM userbets ub
        JOIN sports s ON ub.sport_id = s.id
        JOIN bookies b ON ub.bookie_id = b.id
        WHERE ub.id = $1
      `;
      console.log("Executing Query: ", query);
console.log("With Values: ", [userId]); // Log the parameter values
  
      const { rows } = await db.query(query, [id]);
      console.log("Query Result: ", rows);
  
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
        UPDATE userbets
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
      const query = `DELETE FROM userbets WHERE id = $1 RETURNING *`;
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
        WITH BetHistory AS (
  SELECT
    ub.id AS bet_id,
    ub.bookie_id,
    ub.amount,
    ub.return,
    ub.profit_loss,
    ub.is_won, -- Add this line
    uba.initial_balance,
    ROW_NUMBER() OVER (PARTITION BY ub.bookie_id ORDER BY ub.bet_date) AS row_num
  FROM userbets ub
  JOIN user_bookie_accounts uba ON ub.bookie_id = uba.bookie_id
  WHERE ub.user_id = $1
),
CalculatedBalances AS (
  SELECT
    bet_id,
    bookie_id,
    initial_balance +
    SUM(
      CASE
        WHEN is_won THEN (return - amount) -- Add profit/loss based on winning bets
        ELSE -amount -- Subtract bet amount for losing bets
      END
    ) OVER (PARTITION BY bookie_id ORDER BY row_num ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS bookie_balance
  FROM BetHistory
)
        SELECT 
          ub.*,
          b.name AS bookie_name,
          b.logo_url AS bookie_logo,
          cb.bookie_balance AS calculated_balance
        FROM userbets ub
        JOIN CalculatedBalances cb ON ub.id = cb.bet_id
        JOIN bookies b ON ub.bookie_id = b.id
        WHERE ub.user_id = $1
        ORDER BY ub.bet_date DESC;
      `;
      console.log("Executing Query: ", query);
      console.log("With Values: ", [userId]); // Log the parameter values
      const { rows } = await db.query(query, [userId]);
      console.log("Query Result: ", rows);
  
      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "No bets found for this user." });
      }
  
      res.status(200).json({ bets: rows });
    } catch (error) {
      console.error("Error fetching bets for user:", error.message);
      res.status(500).json({ message: "Error fetching bets", error: error.message });
    }
  }
  

  
  ,

  async getAnalyticsData(req, res) {
    const { userId } = req.params;
  
    try {
      const query = `
        WITH BetHistory AS (
          SELECT 
            ub.bookie_id,
            SUM(ub.net_gain_loss) AS total_net_gain_loss
          FROM userbets ub
          WHERE ub.user_id = $1
          GROUP BY ub.bookie_id
        )
        SELECT 
          uba.id AS account_id,
          b.name AS bookie_name,
          uba.initial_balance,
          uba.initial_balance + COALESCE(bh.total_net_gain_loss, 0) AS calculated_balance,
          b.logo_url,
          b.website_url
        FROM user_bookie_accounts uba
        LEFT JOIN BetHistory bh ON uba.bookie_id = bh.bookie_id
        JOIN bookies b ON uba.bookie_id = b.id
        WHERE uba.user_id = $1;
      `;
      console.log("Executing Query: ", query);
console.log("With Values: ", [userId]); // Log the parameter values
  
      const { rows } = await db.query(query, [userId]);
      console.log("Query Result: ", rows);
  
      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "No bookie accounts found for the user." });
      }
  
      res.status(200).json({ accounts: rows });
    } catch (error) {
      console.error("Error fetching analytics data:", error.message);
      res.status(500).json({ message: "Error fetching analytics data", error: error.message });
    }
  }
  ,

  async getBookieStatistics(req, res) {
  const { userId } = req.params;

  try {
    const query = `
      SELECT 
        b.name AS bookie_name,
        COUNT(CASE WHEN ub.is_won = true THEN 1 END) AS total_wins,
        COUNT(CASE WHEN ub.is_won = false THEN 1 END) AS total_losses,
        ROUND(CASE 
          WHEN COUNT(ub.id) > 0 THEN COUNT(CASE WHEN ub.is_won = true THEN 1 END)::NUMERIC * 100 / COUNT(ub.id)
          ELSE 0 
        END, 2) AS win_percentage,
        ROUND(CASE 
          WHEN SUM(ub.amount) > 0 THEN SUM(ub.profit_loss) * 100 / SUM(ub.amount)
          ELSE 0 
        END, 2) AS roi
      FROM userbets ub
      JOIN bookies b ON ub.bookie_id = b.id
      WHERE ub.user_id = $1
      GROUP BY b.name;
    `;
    console.log("Executing Query: ", query);
console.log("With Values: ", [userId]); // Log the parameter values
    const { rows } = await db.query(query, [userId]);
    console.log("Query Result: ", rows);
    res.status(200).json({ bookie_statistics: rows });
  } catch (error) {
    console.error('Error fetching bookie statistics:', error.message);
    res.status(500).json({ message: 'Error fetching bookie statistics', error: error.message });
  }
},

async getBookieStatistics(req, res) {
  const { userId } = req.params;

  try {
    const query = `
      SELECT 
        b.name AS bookie_name,
        SUM(ub.amount) AS total_bet_amount,
        COUNT(CASE WHEN ub.is_won = true THEN 1 END) AS total_wins,
        COUNT(CASE WHEN ub.is_won = false THEN 1 END) AS total_losses,
        ROUND(CASE 
          WHEN COUNT(ub.id) > 0 THEN COUNT(CASE WHEN ub.is_won = true THEN 1 END)::NUMERIC * 100 / COUNT(ub.id)
          ELSE 0 
        END, 2) AS win_percentage,
        ROUND(CASE 
          WHEN SUM(ub.amount) > 0 THEN SUM(ub.profit_loss) * 100 / SUM(ub.amount)
          ELSE 0 
        END, 2) AS roi,
        uba.initial_balance AS initial_deposited -- Add initial deposited for each bookie
      FROM userbets ub
      JOIN bookies b ON ub.bookie_id = b.id
      JOIN user_bookie_accounts uba ON ub.bookie_id = uba.bookie_id
      WHERE ub.user_id = $1
      GROUP BY b.name, uba.initial_balance;
    `;
    console.log("Executing Query: ", query);
console.log("With Values: ", [userId]); // Log the parameter values
    const { rows } = await db.query(query, [userId]);
    console.log("Query Result: ", rows);
    res.status(200).json({ bookie_statistics: rows });
  } catch (error) {
    console.error("Error fetching bookie statistics:", error.message);
    res.status(500).json({ message: "Error fetching bookie statistics", error: error.message });
  }
},

async getUserStatistics(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "Missing user ID" });
  }

  try {
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM userbets WHERE user_id = $1 AND is_won = true) AS total_wins,
        (SELECT COUNT(*) FROM userbets WHERE user_id = $1 AND is_won = false) AS total_losses,
        ROUND(
          CASE 
            WHEN COUNT(ub.id) > 0 THEN COUNT(CASE WHEN ub.is_won = true THEN 1 END)::NUMERIC * 100 / COUNT(ub.id)
            ELSE 0 
          END, 2
        ) AS win_percentage,
        ROUND(
          CASE 
            WHEN SUM(ub.amount) > 0 THEN SUM(ub.profit_loss) * 100 / SUM(ub.amount)
            ELSE 0
          END, 2
        ) AS roi_based_on_bets, -- ROI based on total bet amount
        ROUND(
          CASE 
            WHEN SUM(uba.initial_balance) > 0 THEN SUM(ub.profit_loss) * 100 / SUM(uba.initial_balance)
            ELSE 0
          END, 2
        ) AS roi_based_on_deposits, -- ROI based on total deposited
        SUM(DISTINCT uba.current_balance) AS total_balance,
        SUM(DISTINCT uba.initial_balance) AS total_deposited
      FROM userbets ub
      JOIN user_bookie_accounts uba ON ub.user_id = uba.user_id
      WHERE ub.user_id = $1
        AND ub.is_won IS NOT NULL;
    `;
    console.log("Executing Query: ", query);
console.log("With Values: ", [userId]); // Log the parameter values

    const { rows } = await db.query(query, [userId]);
    console.log("Query Result: ", rows);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No statistics found for the user." });
    }

    res.status(200).json({ user_statistics: rows[0] });
  } catch (error) {
    console.error("Error fetching user statistics:", error.message);
    res.status(500).json({ message: "Error fetching user statistics", error: error.message });
  }
}




  

  
};

module.exports = userBetsController;
