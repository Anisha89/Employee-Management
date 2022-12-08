const express = require('express')
const router =express.Router()
const EmployeeController = require('../controllers/EmployeeController')
const TaskController = require('../controllers/TaskController')
const aunthenticate = require('../middleware/aunthenticate')




router.get('/list',aunthenticate,  EmployeeController.list)
router.post('/add',aunthenticate,EmployeeController.create)
router.get('/:id',aunthenticate,EmployeeController.showbyid)
router.put('/update/:id',aunthenticate,EmployeeController.update)
router.delete('/delete/:id',aunthenticate,EmployeeController.delete)
router.get('/search',EmployeeController.search)

router.get('/task/list',TaskController.list)
router.post('/task/add', TaskController.create)
module.exports = router