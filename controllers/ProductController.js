const productService = require('../services/products');

const getAll = async (req, res) => {
    try {
        const products = await productService.getAll();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Erro de conexão' });
    }
};

const getById = async ({ params: { id } }, res) => {
    const product = await productService.getProductById(parseInt(id, 10));
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
    } else {
        res.status(200).json(product);
    }
};

const store = async (req, res) => {
    const nameExist = await productService.checkIfNameExist(req.body.name);
    if (nameExist) {
        return res.status(409).json({ message: 'Product already exists' });
    }
    const product = await productService.storeProduct(req.body);
    return res.status(201).json(product);
};

const update = async (req, res) => {
    const { id } = req.params;
  const product = await productService.getProductById(parseInt(id, 10));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const updatedProduct = await productService.updateProduct(parseInt(id, 10), req.body);
  res.status(200).json(updatedProduct);
};

async function deleteProd(req, res) {
    const { id } = req.params;
    const product = await productService.getProductById(parseInt(id, 10));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await productService.deleteProduct(parseInt(id, 10));
    res.status(204).send();
  }

module.exports = {
    getAll,
    getById,
    store,
    update,
    deleteProd,
};