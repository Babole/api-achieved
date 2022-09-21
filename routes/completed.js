const express = require('express');
const router = express.Router();
const completedController = require('../controllers/completed')

router.get('/:id', completedController.show);
router.post('/', completedController.create)

module.exports = router;
