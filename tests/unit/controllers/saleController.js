const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const salesService = require('../../../services/sales');
const salesController = require('../../../controllers/SaleController');
const response = {};
const request = {}

const payloadGetAll = [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
]

const payloadGetById =   [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]

describe('Test Sales Controller', () => {
  describe('GET', () => {
    before(() => {
      sinon.stub(salesService, 'getAll').resolves(payloadGetAll);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
    });
    after(() => salesService.getAll.restore());
    it('verifica o retorno', async () => {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(payloadGetAll)).to.be.true;
    })
  })

  describe(' GET BY ID', () => {
    before(() => {
      sinon.stub(salesService, 'getById').resolves(payloadGetById);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
    });
    after(() => salesService.getById.restore());
    it('verifica o retorno', async () => {
      request.params = {id: 01};
      await salesController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(payloadGetById)).to.be.true;
    })
  })
});