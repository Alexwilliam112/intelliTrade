'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controller')
const marketRouters = require('./markets')
const dashboardRouters = require('./Dashboard')

router.get('/', Controller.renderLandingPage)

// auth middleware
// if req.session => next
router.get('/login', Controller.loginForm)
router.get('/signup', Controller.signupForm)

router.get('/home', Controller.renderHome)
router.use('/market', marketRouters)
router.use('/dashboard', dashboardRouters)
// route error handler

module.exports = router