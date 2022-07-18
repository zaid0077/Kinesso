const testData = require('./Data.js')

let chai = require('chai');
let chaiHttp = require('chai-http')
let should = chai.should();
let expect = chai.expect();

let server = require('../server')

chai.use(chaiHttp);

let payload = testData.samplePayload()


describe('Generate Employee Payslip', () => {
    describe('/payroll/getPayslip', () => {
        it ('should generate employee payslip', (done) => {
            chai.request(server)
            .post('/payroll/getPayslip')
            .set('content-type', 'application/json')
            .send(payload)
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
        })
    })
})