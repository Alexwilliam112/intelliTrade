'use strict'

const router = require('express').Router()
const AuthenController = require('../controllers/authenController')
const marketRouters = require('./marketRouter')
const dashboardRouters = require('./dashboardRouter')
const AuthenMiddleware = require('../middleware/authenMiddleware')

router.get('/', AuthenMiddleware.isLoggedOut, AuthenController.renderLandingPage)

router.get('/login', AuthenMiddleware.isLoggedOut, AuthenController.renderLogin)
router.post('/login', AuthenMiddleware.isLoggedOut, AuthenController.handleLogin)
router.get('/signup', AuthenMiddleware.isLoggedOut, AuthenController.renderSignup)
router.post('/signup', AuthenMiddleware.isLoggedOut, AuthenController.handleSignup)
router.get('/signout', AuthenMiddleware.isLoggedIn, AuthenController.handleLogout)

router.get('/home', AuthenMiddleware.isLoggedIn, AuthenController.renderHome)
router.get('/admin', AuthenMiddleware.isAdmin, AuthenController.renderAdmin)

router.use('/market', AuthenMiddleware.isLoggedIn, marketRouters)
router.use('/dashboard', AuthenMiddleware.isLoggedIn, dashboardRouters)
//TODO route error handler

module.exports = router