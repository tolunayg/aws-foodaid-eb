const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

const controller = require('../controllers/users');

router.get('/', authMiddleware(["admin"]), controller.getAll);
router.get('/:id', authMiddleware(["admin"]), controller.getById);
router.post('/', controller.create);
router.put('/:id', authMiddleware(["admin"]), controller.update);
router.patch('/:id/password', authMiddleware(["admin"]), controller.updatePassword);
router.delete('/:id', authMiddleware(["admin"]), controller.delete);

module.exports = router;