'use strict'

const router = require('express').Router()
const AdminController = require('../controllers/adminController')

router.get('/companyData', AdminController.renderAdmin)
router.post('/companyData/add', AdminController.handleAdd)
router.post('/companyData/update', AdminController.handleUpdate)
router.post('/companyData/:deleteId/delete', AdminController.handleDelete)

module.exports = router
