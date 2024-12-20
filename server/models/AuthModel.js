/* eslint-disable camelcase */
const { db } = require('../db');

const register = (username,email,password) => {
  return db
    .query('INSERT INTO users (username,email,password) VALUES ($1, $2, $3) RETURNING *', [
      username,email,password
    ])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
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
