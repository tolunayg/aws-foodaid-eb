const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

const controller = require('../controllers/inventories');

router.get('/', authMiddleware(["collection-staff", "management-staff", "distribution-staff"]), controller.getAll);
router.get('/:id', authMiddleware(["collection-staff", "management-staff", "distribution-staff"]), controller.getById);
router.post('/', authMiddleware(["collection-staff"]), controller.add);

module.exports = router;