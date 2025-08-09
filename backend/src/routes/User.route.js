const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// CRUD routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
