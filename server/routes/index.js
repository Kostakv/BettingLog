/* eslint-disable camelcase */
const express = require('express');

const IndexRoutes = require('./IndexRoutes');
const AuthRoutes = require('./AuthRoutes');
const UsersRoutes = require ('./UsersRoutes');
const UserBetsRoutes = require ('./UserBetsRoutes');
const ProfileRoutes = require('./ProfileRoutes'); // Add the ProfileRoutes

const router = express.Router();

// RENDERING ROUTES
router.use('/', IndexRoutes);

// AUTHENTICATION ROUTES
router.use('/api/auth', AuthRoutes);


// CRUD REST API users ROUTES
router.use('/api/users', UsersRoutes);


router.use('/api/userbets', UserBetsRoutes);

router.use('/api/user', ProfileRoutes);


router.stack.forEach((middleware) => {
  if (middleware.route) { // Only log middleware with a route
    const methods = Object.keys(middleware.route.methods)
      .map((method) => method.toUpperCase())
      .join(', '); // Convert HTTP methods to uppercase
    console.log(`Registered route: ${methods} ${middleware.route.path}`);
  } else if (middleware.name === 'router') { // Check for nested routers
    middleware.handle.stack.forEach((nestedMiddleware) => {
      if (nestedMiddleware.route) {
        const nestedMethods = Object.keys(nestedMiddleware.route.methods)
          .map((method) => method.toUpperCase())
          .join(', ');
        console.log(`Registered nested route: ${nestedMethods} ${nestedMiddleware.route.path}`);
      }
    });
  }
});


// Catch all route
router.use((req, res) => {
  res.status(404).send({ message: 'URL Not found' });
});



module.exports = router;
