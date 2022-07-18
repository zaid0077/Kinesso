const PayrollService = require("../services/PayrollService")

module.exports = {
    getPaySlip: async function(req, res) {
        try {
            let payrollDetails = await PayrollService.getPaySlip(req.body)
            res.status(200).send({ payrollDetails, message: "Success" })
        } catch (error) {
            res.status(400).send({ error: true, message: error.message })
        }
    },

}