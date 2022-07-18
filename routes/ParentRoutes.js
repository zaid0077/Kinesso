var express = require('express');
var router = express.Router();

router.use('/payroll', require('./PayrollRoute').router); // can secure the route also using passport


module.exports.router = router;