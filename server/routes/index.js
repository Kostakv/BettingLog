/* eslint-disable camelcase */
const express = require('express');

const IndexRoutes = require('./IndexRoutes');
const AuthRoutes = require('./AuthRoutes');
const UsersRoutes = require ('./UsersRoutes');
const UserBetsRoutes = require ('./UserBetsRoutes');


const router = express.Router();

// RENDERING ROUTES
router.use('/', IndexRoutes);

// AUTHENTICATION ROUTES
router.use('/api/auth', AuthRoutes);


// CRUD REST API users ROUTES
router.use('/api/users', UsersRoutes);


router.use('/api/userBets', UserBetsRoutes);



// Catch all route
router.use((req, res) => {
  res.status(404).send({ message: 'URL Not found' });
});

module.exports = router;
