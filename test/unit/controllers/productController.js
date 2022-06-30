const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const productsService = require('../../../services/products');
const productsController = require('../../../controllers/ProductController');
const response = {};
const request = {}

const payload = {
  id: 01,
  name: 'produto',
  quantity: 50,
}

describe('Test Product Controller', () => {
  describe('GET', () => {
    before(() => {
      sinon.stub(productsService, 'getAll').resolves([payload]);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
    });
    after(() => productsService.getAll.restore());
    it('verifica o retorno', async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith([payload])).to.be.true;
    })
  })

  describe(' GET BY ID', () => {
    before(() => {
      sinon.stub(productsService, 'getProductById').resolves(payload);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
    });
    after(() => productsService.getProductById.restore());
    it('verifica o retorno', async () => {
      request.params = {id: 01};
      await productsController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(payload)).to.be.true;
    })
  })

  describe('CREATE', () => {
    before(() => {
      sinon.stub(productsService, 'storeProduct').resolves(payload);
      sinon.stub(productsService, 'checkIfNameExist').resolves(false);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns()
    });
    after(() => productsService.storeProduct.restore());
    it('verifica o retorno', async () => {
      request.body = payload;
      await productsController.store(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    })
  })
});