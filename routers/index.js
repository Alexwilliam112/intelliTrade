'use strict'

const AuthenMiddleware = require('../middleware/authenMiddleware')
const router = require('express').Router()
const { ErrorHandler } = require('../middleware/errorHandler')

const adminRouter = require('./adminRouter')
const marketRouters = require('./marketRouter')
const dashboardRouters = require('./dashboardRouter')

const AuthenController = require('../controllers/authenController')
const PortfolioController = require('../controllers/portfolioController')

router.get('/', AuthenMiddleware.isLoggedOut, AuthenController.renderLandingPage)

router.get('/login', AuthenMiddleware.isLoggedOut, AuthenController.renderLogin)
router.post('/login', AuthenMiddleware.isLoggedOut, AuthenController.handleLogin)
router.get('/signup', AuthenMiddleware.isLoggedOut, AuthenController.renderSignup)
router.post('/signup', AuthenMiddleware.isLoggedOut, AuthenController.handleSignup)
router.get('/signout', AuthenMiddleware.isLoggedIn, AuthenController.handleLogout)
router.get('/home', AuthenMiddleware.isLoggedIn, AuthenController.renderHome)

router.get('/portfolio', AuthenMiddleware.isLoggedIn, PortfolioController.renderPortfolio)
router.use('/admin', AuthenMiddleware.isAdmin, adminRouter)
router.use('/market', AuthenMiddleware.isLoggedIn, marketRouters)
router.use('/dashboard', AuthenMiddleware.isLoggedIn, dashboardRouters)

router.use((req, res, next) => {
    const err = new Error(`Request Not Found - ${req.originalUrl}`);
    err.status = 404;
    next(err);
});
router.use(ErrorHandler)

module.exports = router