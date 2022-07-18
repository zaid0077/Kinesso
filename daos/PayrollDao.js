const config = require("../models/TaxConfig")

module.exports = {
    async getConfig(salary) {
        return await config.findOne({
            $and: [
                { startingAmount: { $lte: salary } },
                { endingAmount: { $gte: salary },}
            ]
        })
    }
}