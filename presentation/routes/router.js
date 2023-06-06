const express = require('express');
const router = express.Router();
const restaurantRoutes = require('./restaurants');
const productRoutes = require('./products');
const distributionPointRoutes = require('./distributionPoints');
const productCategoryRoutes = require('./productCategories');
const demandRoutes = require('./demands');
const inventoryRoutes = require('./inventories');
const collectionPointsRoutes = require('./collectionPoints');
const usersRoutes = require('./users');
const authRoutes = require('./auth');

// Mount your route files to the router object
router.use('/restaurants', restaurantRoutes);
router.use('/products', productRoutes);
router.use('/distribution-points', distributionPointRoutes);
router.use('/product-categories', productCategoryRoutes);
router.use('/demands', demandRoutes);
router.use('/inventories', inventoryRoutes);
router.use('/collection-points', collectionPointsRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

module.exports = router;