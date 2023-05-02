const express = require('express');
const router = express.Router();
const restaurantRoutes = require('./restaurants');
const productRoutes = require('./products');

// Attach the middleware function to the router
// Middleware function to set req.user
const setUser = (req, res, next) => {
    req.user = req.oidc.user;
    next();
};
router.use(setUser);

// Mount your route files to the router object
router.use('/restaurants', restaurantRoutes);
router.use('/products', productRoutes);

module.exports = router;