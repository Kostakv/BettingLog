/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');

const { AuthModel, UsersModel } = require('../models');

const register = (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    console.log("Missing input fields");
    return res.status(400).json({ message: 'Please provide all details required!' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  AuthModel.register(username, email, hashedPassword)
    .then(user => {
      console.log("User registered successfully:", user);
      res.status(201).json({ message: 'User registered successfully!', user });
    })
    .catch(error => {
      console.error("Backend error:", error.message);

      if (error.message.includes('already exists')) {
        return res.status(409).json({ message: 'Username or email already exists' });
      }
      return res.status(500).json({ message: 'Error creating user', error: error.message });
    });
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'Provide username and password' });
  }

  AuthModel.login(username)
  .then(user => {
    if (user) {
      const passwordsMatch = bcrypt.compareSync(password, user.password);
      if (!passwordsMatch) {
        return res.status(401).send({ message: 'Invalid credentials!' });
      }

      // Store the user ID and user object (excluding password) in the session
      req.session.userId = user.id; // Set userId for getProfile consistency
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email
      };

      console.log("Session set for user:", req.session.user);

      res.status(200).send({
        message: 'User logged in successfully!',
        user: req.session.user
      });
    } else {
      return res.status(401).send({ message: 'Invalid credentials!' });
    }
  })
  .catch(error => {
    console.error("Login error:", error.message);
    res.status(500).send({ message: "Error during login", error: error.message });
  });
};

const logout = (req, res) => {
  req.session = null;
  res.status(200).send({ message: 'User successfully logged out' });
};

module.exports = { register, login, logout };
