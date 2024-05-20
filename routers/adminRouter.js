'use strict'

const router = require('express').Router()
const AdminController = require('../controllers/adminController')

router.get('/', AdminController.renderAdmin)
router.post('/add', AdminController.handleAdd)
router.post('/update', AdminController.handleUpdate)
router.post('/:deleteId/delete', AdminController.handleDelete)

module.exports = router
