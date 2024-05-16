'use strict'

const router = require('express').Router()
const AdminController = require('../controllers/adminController')

router.get('/', AdminController.renderAdmin)
router.get('/:id/update', AdminController.renderUpdate)

module.exports = router