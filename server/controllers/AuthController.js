const bcrypt = require('bcryptjs');
const { db } = require('../db');
const AuthModel = require('../models/AuthModel');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "Provide username and password" });
  }

  try {
    const user = await AuthModel.login(username);

    if (!user) {
      return res.status(401).send({ message: "Invalid credentials!" });
    }

    const passwordsMatch = bcrypt.compareSync(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).send({ message: "Invalid credentials!" });
    }

    // Log the result from AuthModel.login
    console.log("AuthModel.login result:", user);

    // Fetch and log the current database state
    const query = `SELECT id, username, email, is_profile_set_up FROM users WHERE id = $1`;
    const { rows } = await db.query(query, [user.id]);
    const dbUser = rows[0];

    console.log("Database state during login:", dbUser);

    // Set the session with accurate values
    req.session.userId = dbUser.id;
    req.session.user = {
      id: dbUser.id,
      username: dbUser.username,
      email: dbUser.email,
      isProfileSetUp: dbUser.is_profile_set_up,
    };

    console.log("Session set for user during login:", req.session.user);

    return res.status(200).send({
      message: "User logged in successfully!",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).send({ message: "Error during login", error: error.message });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all details required!' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `
      INSERT INTO users (username, email, password, is_profile_set_up)
      VALUES ($1, $2, $3, false)
      RETURNING id, username, email, is_profile_set_up;
    `;
    const { rows } = await db.query(query, [username, email, hashedPassword]);
    const newUser = rows[0];

    console.log("User registered successfully:", newUser);

    res.status(201).json({
      message: 'User registered successfully!',
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    if (error.message.includes('duplicate key value')) {
      return res.status(409).json({ message: 'Username or email already exists.' });
    }
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

const logout = (req, res) => {
  req.session = null; // Destroy the session
  res.status(200).send({ message: "Logged out successfully!" });
};

module.exports = { login, register, logout };
