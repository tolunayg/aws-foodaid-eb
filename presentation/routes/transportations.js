const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

const controller = require('../controllers/transportations');

router.get('/', authMiddleware(["collection-staff", "distribution-staff"]), controller.getAll);
router.get('/:id', authMiddleware(["collection-staff", "distribution-staff"]), controller.getById);
router.post('/', authMiddleware(["collection-staff"]), controller.create);
router.patch('/:id/approve', authMiddleware(["distribution-staff"]), controller.approve);

module.exports = router;