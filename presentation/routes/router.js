const express = require('express');
const router = express.Router();
const restaurantRoutes = require('./restaurants');
const productRoutes = require('./products');
const distributionPointRoutes = require('./distributionPoints');
const productCategoryRoutes = require('./productCategories');
const demandRoutes = require('./demands');
const inventoryRoutes = require('./inventories');

// Mount your route files to the router object
router.use('/restaurants', restaurantRoutes);
router.use('/products', productRoutes);
router.use('/distribution-points', distributionPointRoutes);
router.use('/product-categories', productCategoryRoutes);
router.use('/demands', demandRoutes);
router.use('/inventories', inventoryRoutes);

module.exports = router;