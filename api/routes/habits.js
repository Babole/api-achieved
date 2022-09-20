const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits')

router.get('/:id', habitsController.showById);
router.get('/user/:id', habitsController.showByUserId);
router.post('/', habitsController.create)
router.delete('/:id', habitsController.destroy)

module.exports = router;


