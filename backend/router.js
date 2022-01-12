const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const verifyToken = require('./tokenVerification/auth')
router.post('/signup', userController.signUp)

router.post('/login', userController.login)

router.delete('/users/:id', verifyToken, userController.removeUserById)

router.get('/users', verifyToken, userController.getAllUsersById)

router.get('/users/:id',verifyToken, userController.getUserById)

router.put('/users/:id',verifyToken, userController.updateUserById)

router.post('/users/create', verifyToken, userController.signUp)

module.exports = router;