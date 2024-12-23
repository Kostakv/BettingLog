const express = require('express');
const { UserBetsController } = require('../controllers');
const router = express.Router();

// CRUD REST API ROUTES FOR userBets
router.post('/', UserBetsController.create);
router.get('/', UserBetsController.getAll);
router.get('/:id', UserBetsController.getById);
router.put('/:id', UserBetsController.update);
router.delete('/:id', UserBetsController.remove);
router.get('/statistics/:userId', UserBetsController.getBookieStatistics);
router.get('/userStatistics/:userId', UserBetsController.getUserStatistics);

// Custom Route: Get all bets for a specific user
router.get('/bets/:userId', UserBetsController.getByUserId);

// New Route: Get bookie accounts and related data for analytics
router.get('/analytics/:userId', UserBetsController.getAnalyticsData);

module.exports = router;