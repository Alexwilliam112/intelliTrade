'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controller')
const dashboardRouters = require('./dashboards')
const authenticationRouters = require('./authentications')
const orderSummaries = require('./orderSummaries')

router.get('/', Controller.renderLandingPage)
router.get('/home', Controller.renderHome)
router.use('/dashboard', dashboardRouters)
router.use('/ordersummary', orderSummaries)

module.exports = router