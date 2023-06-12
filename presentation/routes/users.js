const express = require('express');
const router = express.Router();

const controller = require('../controllers/users');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id/password', controller.updatePassword);
router.delete('/:id', controller.delete);

module.exports = router;