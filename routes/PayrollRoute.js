const express = require('express')
const router = express.Router()
const  validateRequestSchema = require("../middleware/ValidateSchema")
const payrollSchema = require('../schema/PayrollSchema')
const PayrollController = require("../controllers/PayrollController")


router.post('/getPaySlip', payrollSchema, validateRequestSchema, PayrollController.getPaySlip)


module.exports.router = router