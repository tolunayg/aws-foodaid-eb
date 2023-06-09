const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')


const controller = require('../controllers/demands');

router.get('/', authMiddleware(["collection-staff", "management-staff", "distribution-staff"]), controller.getAll);
router.get('/:id', authMiddleware(["collection-staff", "management-staff", "distribution-staff"]), controller.getById);
router.post('/', authMiddleware(["distribution-staff"]), controller.create);
router.put('/:id', authMiddleware(["distribution-staff"]), controller.update);
router.delete('/:id', authMiddleware(["distribution-staff"]), controller.delete);

module.exports = router;