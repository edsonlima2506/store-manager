const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const productsModel = require('../../../models/product');
const connection = require('../../../models/connection');

describe('Busca todos os produtos no BD', () => {
    describe('Quando não existe nenhum produto cadastrado', () => {
      const resultExecute = [[]];
      beforeEach(() => {
        sinon.stub(connection, 'execute')
        .resolves(resultExecute);
      });
      afterEach(() => {
        connection.execute.restore();
      });
      it('Retorna um array', async () => {
        const result = await productsModel.getAllProd();
        expect(result).to.be.an('array');
      });
      it('O array está vazio', async () => {
        const result = await productsModel.getAllProd();
        expect(result).to.be.empty;
      });
    });
    describe('Quando existem produtos cadastrados', () => {
      beforeEach(() => {
        sinon.stub(connection, 'execute')
        .resolves([[{id: 2, name: 'xablau', quantity: 15}]]);
      });
      afterEach(() => {
        connection.execute.restore();
      });
      it('Retorna um array', async () => {
        const result = await productsModel.getAllProd();
        expect(result).to.be.an('array');
      })
      it('O array não está vazio', async () => { 
        const result = await productsModel.getAllProd();
        expect(result).to.be.not.empty;
      });
      it('O array possui objetos', async () => { 
        const [result] = await productsModel.getAllProd();
        expect(result).to.be.an('object');
      });
      it('O objeto que está no array possui os atributos id, name e quantity', async () => {
        const [result] = await productsModel.getAllProd();
        expect(result).to.be.includes.all.keys('id', 'name', 'quantity');
      });
    });
});

    describe('Busca produto por id', () => {
        describe('Quando não existem produtos cadastrados', () => {
          const resultExecute = [[{}]];
          beforeEach(() => {
            sinon.stub(connection, 'execute')
            .resolves(resultExecute);
          });
          afterEach(() => {
            connection.execute.restore();
          });
          it('Retorna um object', async () => {
            const result = await productsModel.getProdById();
            expect(result[0]).to.be.an('object');
          });
          it('O objeto está vazio', async () => {
            const result = await productsModel.getProdById();
            expect(result[0]).to.be.empty;
          });
        });
        describe('Quando existem produtos cadastrados', () => {
          const resultExecute = [[{
          id: 2,
          name: 'Traje de encolhimento',
          quantity: 20,
        }]];
        beforeEach(() => {
          sinon.stub(connection, 'execute')
          .resolves(resultExecute);
        });
        afterEach(() => {
          connection.execute.restore();
        });
          it('Retorna um objeto', async () => {
            const result = await productsModel.getProdById();
            expect(result[0]).to.be.an('object');
          });
          it('Retorna um objeto com as chaves id, name e quantity', async () => {
            const result = await productsModel.getProdById();
            expect(result[0]).to.be.includes.keys('id', 'name', 'quantity');
          });
        });
      });

      describe('Testa o método storeProduct da camada models - products', () => {
        describe('Caso o produto seja adicionado no banco de dados', () => {
          const name = 'Chinelão do Yang';
          const quantity = 15;
          beforeEach(() => {
            sinon.stub(connection, 'execute')
            .resolves([{insertId: 5}]);
          });
          afterEach(() => {
            connection.execute.restore();
          })
          it('Retorna um objeto', async () => {
            const result = await productsModel.storeProduct(name, quantity);
            expect(result).to.be.an('object');
            });
          it('Retorna um objeto com as chaves id, name e quantity', async () => {
            const result = await productsModel.storeProduct(name, quantity);
            expect(result).to.be.includes.keys('id', 'name', 'quantity');
          });
        });
      });

      describe('Testa o método deleteProduct da camada models - Products', () => {
        describe('Caso o produto seja deletado com sucesso', () => {
          const id = 1;
          beforeEach(() => {
            sinon.stub(connection, 'execute')
            .resolves([{affectedRows: 1}]);
          })
          afterEach(() => {
            connection.execute.restore();
          })
          it('Retorna uma string com o valor "Deletado"', async () => {
            const result = await productsModel.deleteProduct(id);
            expect(result.status).to.be.equal(204);
          });
        })
      })