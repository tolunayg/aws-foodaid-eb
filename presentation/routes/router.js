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
const authRoutes = require('./auth');

// Mount your route files to the router object
router.use('/restaurants', restaurantRoutes);
router.use('/products', authMiddleware(["management-staff"]), productRoutes);
router.use('/distribution-points', authMiddleware(["management-staff"]), distributionPointRoutes);
router.use('/product-categories', authMiddleware(["management-staff"]), productCategoryRoutes);
router.use('/demands', authMiddleware(["collection-staff", "distribution-staff"]), demandRoutes);
router.use('/inventories', authMiddleware(["collection-staff", "management-staff"]), inventoryRoutes);
router.use('/collection-points', authMiddleware(["management-staff"]), collectionPointsRoutes);
router.use('/users', authMiddleware(["admin"]), usersRoutes);
router.use('/auth', authRoutes);

module.exports = router;