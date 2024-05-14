'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.renderDashboard)
router.post('/buyorder', Controller.buyPost)
router.post('/sellorder', Controller.sellPost)

module.exports = router