const productModel = require('../models/product');

const getAll = async () => {
    const product = await productModel.getAllProd();
    return product;
};
  
const getProductById = async (id) => {
    const [product] = await productModel.getProdById(id);
    return product;
};

const storeProduct = async (product) => {
    const productCreated = await productModel.storeProduct(product);
    return productCreated;
};

const checkIfNameExist = async (name) => {
    const nameExist = await productModel.checkIfNameExist(name);
    return nameExist;
};

const updateProduct = async (id, product) => {
    const updatedProduct = await productModel.updateProduct(id, product);
    return updatedProduct;
};

const deleteProduct = async (id) => {
    await productModel.deleteProduct(id);
};

module.exports = {
    getAll,
    getProductById,
    storeProduct,
    checkIfNameExist,
    updateProduct,
    deleteProduct,
  };