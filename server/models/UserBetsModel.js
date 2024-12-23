const { db } = require('../db');

const create = (userId, sportId, bookieId, eventName, pick, betType, odds, amount, result, isWon, returnVal, profitLoss) => {
  const netGainLoss = isWon ? returnVal - amount : -amount;
  return db
    .query(
      'INSERT INTO userbets (user_id, sport_id, bookie_id, event_name, pick, bettype, odds, amount, result, is_won, return, profit_loss, net_gain_loss) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [userId, sportId, bookieId, eventName, pick, betType, odds, amount, result, isWon, returnVal, profitLoss, netGainLoss]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAll = () => {
  console.log('getAll at model');
  return db
    .query('SELECT * FROM userbets')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getById = id => {
  return db
    .query('SELECT * FROM userbets WHERE id = $1', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const update = (sportId, bookieId, eventName, pick, betType, odds, amount, result, isWon, returnVal, profitLoss, id) => {
  const netGainLoss = isWon ? returnVal - amount : -amount;
  return db
    .query(
      'UPDATE userbets SET sport_id = $1, bookie_id = $2, event_name = $3, pick = $4, bettype = $5, odds = $6, amount = $7, result = $8, is_won = $9, return = $10, profit_loss = $11, net_gain_loss = $12 WHERE id = $13 RETURNING *',
      [sportId, bookieId, eventName, pick, betType, odds, amount, result, isWon, returnVal, profitLoss, netGainLoss, id]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const remove = id => {
  return db
    .query('DELETE FROM userbets WHERE id = $1', [id])
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

module.exports = { create, getAll, getById, update, remove };
