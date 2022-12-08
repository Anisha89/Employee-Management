const express = require('express')
const router = express.Router()

const AuthController =require('../controllers/AuthController')
router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.get('/logout',AuthController.logout)
router.put('/forgot',AuthController.forgotpassword)

module.exports = router