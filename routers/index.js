'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controller')
const marketRouters = require('./markets')
const authenticationRouters = require('./authentications')
const dashboardRouters = require('./Dashboard')

router.get('/', Controller.renderLandingPage)
router.get('/home', Controller.renderHome)
router.use('/market', marketRouters)
router.use('/dashboard', dashboardRouters)

module.exports = router