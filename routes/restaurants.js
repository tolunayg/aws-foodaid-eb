const { client, getDb } = require('../mongodb');
const express = require('express');
const router = express.Router();

// Define a middleware function to set the database connection
const setDatabase = (req, res, next) => {
    req.db = getDb('sample_restaurants'); // Specify the database name here
    next();
}

// Attach the middleware function to the router
router.use(setDatabase);

const restaurantController = require('../controllers/restaurants');


router.get('/', restaurantController.getAll);
router.get('/:id', restaurantController.getById);
router.post('/', restaurantController.create);
router.put('/:id', restaurantController.update);
router.delete('/:id', restaurantController.delete);

module.exports = router;
