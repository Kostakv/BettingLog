const express = require('express');

const { UserBetsController } = require('../controllers');

const router = express.Router();

// CRUD REST API FRUITS ROUTES
// CREATE - post
router.post('/', UserBetsController.create);

// READ - get
// Read All
router.get('/', UserBetsController.getAll);


router.get('/profile', UserBetsController.getProfile);

// Read One
router.get('/:id', UserBetsController.getById);

// UPDATE - put
router.put('/:id', UserBetsController.update);

// DELETE - delete
router.delete('/:id', UserBetsController.remove);

//router.get('/profile', UsersController.getProfile);


module.exports = router;
