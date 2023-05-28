const express = require('express');
const router = express.Router();

const controller = require('../controllers/inventories');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.add);

module.exports = router;