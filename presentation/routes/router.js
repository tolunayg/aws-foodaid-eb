const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')
const restaurantRoutes = require('./restaurants');
const productRoutes = require('./products');
const distributionPointRoutes = require('./distributionPoints');
const productCategoryRoutes = require('./productCategories');
const demandRoutes = require('./demands');
const inventoryRoutes = require('./inventories');
const collectionPointsRoutes = require('./collectionPoints');
const usersRoutes = require('./users');
const transportationRoutes = require('./transportations');
const authRoutes = require('./auth');

// Mount your route files to the router object
router.use('/restaurants', restaurantRoutes);
router.use('/products', authMiddleware(["management-staff"]), productRoutes);
router.use('/distribution-points', authMiddleware(["management-staff"]), distributionPointRoutes);
router.use('/product-categories', authMiddleware(["management-staff"]), productCategoryRoutes);
router.use('/demands', demandRoutes);
router.use('/inventories', inventoryRoutes);
router.use('/collection-points', authMiddleware(["management-staff"]), collectionPointsRoutes);
router.use('/users', usersRoutes);
router.use('/transportations', transportationRoutes);
router.use('/auth', authRoutes);

module.exports = router;