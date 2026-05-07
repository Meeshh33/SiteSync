const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/profile', auth, userController.getUserProfile);
router.get('/', auth, userController.getAllUsers);
router.put('/profile', auth, userController.updateUserProfile);

module.exports = router;
