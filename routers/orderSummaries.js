'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.renderOrderSummary)


module.exports = router