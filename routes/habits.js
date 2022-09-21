const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits');
const { verifyToken } = require('../middleware/auth');

router.get('/:id', habitsController.showById);
router.get('/user/:id', verifyToken, habitsController.showByUserId);
router.post('/', habitsController.create)
router.delete('/:id', habitsController.destroy)

module.exports = router;


