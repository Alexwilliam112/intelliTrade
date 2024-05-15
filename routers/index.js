'use strict'

const router = require('express').Router()
const AuthenController = require('../controllers/authenController')
const marketRouters = require('./marketRouter')
const dashboardRouters = require('./dashboardRouter')

router.get('/', AuthenController.renderLandingPage)

router.get('/login', AuthenController.renderLogin)
router.post('/login', AuthenController.handleLogin)
router.get('/signup', AuthenController.renderSignup)
router.post('/signup', AuthenController.handleSignup)

router.get('/home', AuthenController.renderHome)


router.use('/market', marketRouters)
router.use('/dashboard', dashboardRouters)
// route error handler

module.exports = router