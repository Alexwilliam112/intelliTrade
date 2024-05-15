'use strict'

const router = require('express').Router()
const DashboardController = require('../controllers/dashboardController')

router.get('/', DashboardController.renderDashboard)
router.get('/updateOrder/:id', DashboardController.updateOrder)
router.post('/buyorder', DashboardController.buyPost)
router.post('/sellorder', DashboardController.sellPost)


module.exports = router