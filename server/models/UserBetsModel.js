const { db } = require('../db');

const create = (userId, name, color, emoji) => {
  return db
    .query(
      'INSERT INTO userBets (userId, name, color, emoji) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, name, color, emoji]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAll = () => {
  console.log('getAll at model')
  return db
    .query('SELECT * FROM userBets')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getById = id => {
  return db
    .query('SELECT * FROM userBets WHERE id = $1', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const update = (name, color, emoji, id) => {
  return db
    .query(
      'UPDATE userBets SET name = $1, color = $2, emoji = $3 WHERE id = $4 RETURNING *',
      [name, color, emoji, id]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const remove = id => {
  return db
    .query('DELETE FROM userBets WHERE id = $1', [id])
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

module.exports = { create, getAll, getById, update, remove };
