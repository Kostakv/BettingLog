const express = require('express');
const { ProfileController } = require('../controllers/ProfileController'); // Using destructuring
const router = express.Router();

// Route for setting up the user profile
router.post('/setup-profile', ProfileController.setupProfile);

module.exports = router;
