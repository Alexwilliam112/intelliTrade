'use strict'

const router = require('express').Router()
const AdminController = require('../controllers/adminController')

router.get('/', AdminController.renderAdmin)
router.post('/add', AdminController.handleAdd)
router.post('/update', AdminController.handleUpdate)

module.exports = router
