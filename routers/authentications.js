'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/login', Controller.loginForm)
router.get('/signup', Controller.signupForm)

module.exports = router