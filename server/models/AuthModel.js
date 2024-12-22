/* eslint-disable camelcase */
const { db } = require('../db');

const register = async (username, email, password) => {
  // Check if username or email already exists (case-sensitive)
  const existingUser = await db.query(
    'SELECT * FROM users WHERE username = $1 COLLATE "C" OR email = $2 COLLATE "C"',
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

const login = async (username) => {
  const query = `
    SELECT id, username, email, password, is_profile_set_up
    FROM users
    WHERE username = $1
  `;
  console.log("Executing AuthModel.login query:", query, "with username:", username);
  const { rows } = await db.query(query, [username]);
  console.log("AuthModel.login result:", rows[0]);
  return rows[0];
};


const businessLogin = email => {
  return db
    .query('SELECT * FROM businesses WHERE email = $1 COLLATE "C"', [email])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

module.exports = { register, login, businessLogin };
