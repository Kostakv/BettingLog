/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');

const { AuthModel, UsersModel } = require('../models');

const register = (req, res) => {
  const { username,email,password } = req.body;
  if (!email || !password || !username) {
    return res
      .status(400)
      .send({ message: 'Please provide all details requierd!' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  AuthModel.register(username,email,hashedPassword)
    .then(user => {
      res.status(201).send({ message: 'User registered successfully!', user });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error creating user', error: error.message });
    });
};

const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Provide email and password' });
  }

  AuthModel.login(username)
    .then(user => {
      if (user) {
        const passwordsMatch = bcrypt.compareSync(password, user.password);
        if (!passwordsMatch) {
          return res.status(401).send({ message: 'Invalid credentials!' });
        }
        

        req.session.userId = user.id;
        delete user.password;
        res.status(200).send({ message: 'User logged in successfully!', user });
      } else {
        return res.status(401).send({ message: 'Invalid credentials!' });
      }
      
    });


};

const logout = (req, res) => {
  req.session = null;
  res.status(200).send({ message: 'User successfully logged out' });
};

module.exports = { register, login, logout };
