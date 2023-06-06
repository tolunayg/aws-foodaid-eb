const express = require('express');
const authMiddleware = require('../middlewares/auth')
const router = express.Router();

const productController = require('../controllers/products');

router.get('/', authMiddleware, productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;