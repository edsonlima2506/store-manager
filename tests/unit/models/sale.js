const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const salesModel = require('../../../models/sale');
const connection = require('../../../models/connection');

const salesGetAll = {
  salesId: 01,
  data: '2019-01-01',
  productId: 03,
  quantity: 50,
}

const salesGetById = {
  salesId: 01,
  productId: 03,
  quantity: 50,
}

describe('Test Sale Model', () => {
  describe('GET', () => {
    before(() => {
      sinon.stub(connection, 'query').resolves([[salesGetAll]]);
    });
    after(() => connection.query.restore());
    it('verifica o retorno', async () => {
      const obj = await salesModel.getAllSales();
      expect(obj).to.be.a("array");
    })
  })

  describe('Get By Id', () => {
    before(() => {
      sinon.stub(connection, 'query').resolves([salesGetById]);
    });
    after(() => connection.query.restore());
    it('verifica o retorno', async () => {
      const obj = await salesModel.getSaleById(01);
      expect(obj[0]).to.be.a("object");
    })
  })
});