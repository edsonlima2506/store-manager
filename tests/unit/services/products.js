const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const productsService = require('../../../services/products');
const productsModel = require('../../../models/product');

const product = {
  id: 01,
  name: 'produto',
  quantity: 50,
}

describe('Testa o método getAll da camada services - Products', () => {
  describe('Quando não existe nenhum produto cadastrado', () => {
    const resultExecute = [[]];
    beforeEach(() => {
      sinon.stub(productsModel, 'getAllProd')
      .resolves(resultExecute);
    });
    afterEach(() => {
      productsModel.getAllProd.restore();
    });
    it('Retorna um array', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.an('array');
    });
    it('O array está vazio', async () => {
      const [result] = await productsService.getAll();
      expect(result).to.be.empty;
    });
  });
  describe('Quando existem produtos cadastrados', () => {
    beforeEach(() => {
      sinon.stub(productsModel, 'getAllProd')
      .resolves([{id: 2, name: 'xablau', quantity: 15}]);
    });
    afterEach(() => {
      productsModel.getAllProd.restore();
    });
    it('Retorna um array', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.an('array');
    })
    it('O array não está vazio', async () => { 
      const result = await productsService.getAll();
      expect(result).to.be.not.empty;
    });
    it('O array possui objetos', async () => { 
      const [result] = await productsService.getAll();
      expect(result).to.be.an('object');
    });
    it('O objeto que está no array possui os atributos id, name e quantity', async () => {
      const result = await productsService.getAll();
      expect(result[0]).to.be.includes.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Testa o método getById da camada services - Products', () => {
  describe('Quando existem produtos cadastrados', () => {
    const resultExecute = [[{
    id: 2,
    name: 'Traje de encolhimento',
    quantity: 20,
  }]];
  beforeEach(() => {
    sinon.stub(productsModel, 'getProdById')
    .resolves(resultExecute);
  });
  afterEach(() => {
    productsModel.getProdById.restore();
  });
    it('Retorna um objeto', async () => {
      const [result] = await productsService.getProductById();
      expect(result).to.be.an('object');
    });
    it('Retorna um objeto com as chaves id, name e quantity', async () => {
      const [result] = await productsService.getProductById();      
      expect(result).to.be.includes.keys('id', 'name', 'quantity');
    });

  });
});
