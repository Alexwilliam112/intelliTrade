'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.renderDashboard)
router.get('/:id', Controller.stockDetails)
router.post('/:id/buyorder', Controller.buyPost)
router.post('/:id/sellorder', Controller.sellPost)

module.exports = router