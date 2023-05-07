const express = require('express');
const router = express.Router();

const distributionPointController = require('../controllers/distributionPoints');

router.get('/', distributionPointController.getAll);
router.get('/:id', distributionPointController.getById);
router.post('/', distributionPointController.create);
router.put('/:id', distributionPointController.update);
router.delete('/:id', distributionPointController.delete);

module.exports = router;