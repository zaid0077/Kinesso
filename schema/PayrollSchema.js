const { body } = require('express-validator');


const payrollSchema = [
    body('firstName').exists(),
    body('lastName').exists(),
    body('annualSalary').exists().isNumeric(),
    body('superRate').exists().isNumeric(),
    body('paymentStartDate').exists().isDate(),


]

module.exports = payrollSchema;