const payrollDao = require("../daos/PayrollDao")
const moment = require('moment')

module.exports = {
    async getPaySlip(params) {

        let startDate = params.paymentStartDate[0] // Getting start and end date from the payload date array
        let endDate = params.paymentStartDate[1]

        let totalMonths = Math.round(moment(endDate).diff(moment(startDate), 'months', true))

        if (moment(startDate).isAfter(endDate, 'day')) { // Checking if end date is greater than start date
            throw new Error('End Date cant be greater than start date')
        }

        let config = await payrollDao.getConfig(params.annualSalary) // fetching configs from database

        let name = `${params.firstName} ${params.lastName}`

        let payPeriod = `${moment(startDate).format("DD MMMM")} - ${moment(endDate).format("DD MMMM")}`

        let grossIncome = Math.round((params.annualSalary / 12))

        let incomeTax = this.calculateIncomeTax(config, params.annualSalary, totalMonths)

        let superRate = Math.round((grossIncome *  (params.superRate / 100)))

        let netIncome = Math.round(grossIncome - incomeTax)

        let dataToReturn = {
            "Name": name,
            "Pay Period": payPeriod,
            "Gross Income": grossIncome,
            "Income Tax": incomeTax,
            "Super Rate": superRate,
            "Net Income": netIncome
        }

        return dataToReturn
    },

    calculateIncomeTax(config, salary, totalMonths) {
        if (config.totalTax == 0 && config.taxPerDollar == 0) {
            return 0
        } else {
            let taxInDollars = config.taxPerDollar / 100;  // Converting Cents to Dollars

            let totalAmount = ((salary - config.startingAmount) * taxInDollars)
            let taxPerMonth = Math.round((totalAmount + config.totalTax) / 12)
            let totalTaxInRange = taxPerMonth * totalMonths
            return totalTaxInRange
        }
    }

}