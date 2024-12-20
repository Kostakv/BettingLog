/* eslint-disable camelcase */
const { db } = require('../db');

const register = async (username, email, password) => {
  // Check if username or email already exists
  const existingUser = await db.query(
    'SELECT * FROM users WHERE username = $1 OR email = $2',
    [username, email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error('Username or email already exists');
  }

  // Insert the new user if username/email is unique
  const result = await db.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, password]
  );

  return result.rows[0];
};

const login = username => {
  return db
    .query('SELECT * FROM users WHERE username = $1', [username])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const businessLogin = email => {
  return db
    .query('SELECT * FROM businesses WHERE email = $1', [email])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};


module.exports = { register, login, businessLogin };
