const chai = require('chai');
const expect = chai.expect
const sinon = require('sinon');
const salesService = require('../../../services/sales');
const salesModel = require('../../../models/sale');
const productsService = require('../../../services/products');

describe('Testa o método getAll da camada services - Sales', () => {
  describe('Quando não existe nenhum produto cadastrado', () => {
    const resultExecute = [[]];
    beforeEach(() => {
      sinon.stub(salesModel, 'getAllSales')
      .resolves(resultExecute);
    });
    afterEach(() => {
      salesModel.getAllSales.restore();
    });
    it('Retorna um array', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    });
    it('O array está vazio', async () => {
      const [result] = await salesService.getAll();
      expect(result).to.be.empty;
    });
  });
  describe('Quando existem produtos cadastrados', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'getAllSales')
      .resolves([{saleId: 2, date: '22/02/2021', productId: 2, quantity: 15}]);
    });
    afterEach(() => {
      salesModel.getAllSales.restore();
    });
    it('Retorna um array', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    })
    it('O array não está vazio', async () => { 
      const result = await salesService.getAll();
      expect(result).to.be.not.empty;
    });
    it('O array possui objetos', async () => { 
      const [result] = await salesService.getAll();
      expect(result).to.be.an('object');
    });
    it('O objeto que está no array possui os atributos saleId, date, productId e quantity', async () => {
      const [result] = await salesService.getAll();
      expect(result).to.be.includes.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});

describe('Testa o método deleteSale da camada services - Sales', () => {
  describe('Quando a venda é deletada com sucesso', () => {
    const id = 1;
    beforeEach(() => {
      sinon.stub(salesModel, 'deleteSale')
      .resolves({status: 204});
      sinon.stub(salesModel, 'getSaleById')
      .resolves([{xablau: 'xablau'}]);
      sinon.stub(productsService, 'getProductById').resolves({ id: 1, name: 'Martelo de Thor', quantity: 50 });
      sinon.stub(productsService, 'updateProduct').resolves();
    });
    afterEach(() => {
      salesModel.deleteSale.restore();
      salesModel.getSaleById.restore();
      productsService.getProductById.restore();
      productsService.updateProduct.restore();
    }); 
    it('Retorna um objeto {status: 204}', async () => {
      const result = await salesService.deleteSale(id);
      expect(result.status).to.be.equal(204);
    });
  });
  describe('Quando a venda com o id não é encontrado', () => {
    const id = 1;
    beforeEach(() => {
      sinon.stub(salesModel, 'deleteSale')
      .resolves({status: 204});
      sinon.stub(salesModel, 'getSaleById')
      .resolves([]);
    });
    afterEach(() => {
      salesModel.deleteSale.restore();
      salesModel.getSaleById.restore();
    }); 
    it('Lança um erro status 404 e a mensagem "Sale not found"', async () => {
      try {
        await salesService.deleteSale(id);
      } catch(err) {
        expect(err.status).to.be.equal(404);
        expect(err.message).to.be.equal('Sale not found');
      }
    })
  })
 });