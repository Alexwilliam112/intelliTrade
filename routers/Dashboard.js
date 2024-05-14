'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.renderDashboard)


module.exports = router