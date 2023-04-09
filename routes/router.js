const express = require('express');
const router = express.Router();

// Import your route files
const restaurantRoutes = require('./restaurants');

// Mount your route files to the router object
router.use('/restaurants', restaurantRoutes);

module.exports = router;
