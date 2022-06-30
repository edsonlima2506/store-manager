const saleModel = require('../models/sale');

const getAll = async () => {
    const sales = await saleModel.getAllSales();
    return sales;
};
  
const getById = async (id) => {
    const [sale] = await saleModel.getSaleById(id);
    return sale;
};

const saleStore = async (sales) => {
    const idSales = await saleModel.storeSale();
    sales.forEach(async (sale) => {
      await saleModel.storeSaleProduct(idSales, sale);
    });
    return {
      id: idSales,
      itemsSold: sales,
      productId: sales.productId,
    };
};

async function update(id, sales) {
    sales.forEach(async (sale) => {
        await saleModel.update(id, sale);
    });
    return {
        saleId: id,
        itemUpdated: sales,
    };
}

const deleteSale = async (id) => {
    await saleModel.deleteSale(id);
    return { status: 204 };
};

module.exports = {
    getAll,
    getById,
    saleStore,
    update,
    deleteSale,
  };