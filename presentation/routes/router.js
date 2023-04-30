const express = require('express');
const router = express.Router();
const restaurantRoutes = require('./restaurants');

// Middleware function to set req.user
// const setUser = (req, res, next) => {
//   req.user = req.oidc.user;
//   next();
// };

// Attach the middleware function to the router
// router.use(setUser);

// Mount your route files to the router object
router.use('/restaurants', restaurantRoutes);

module.exports = router;