function idValidate(req, res, next) {
    const sales = req.body;
    const productIdExists = sales.every((sale) => sale.productId);
    if (!productIdExists) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    next();
  }
  
  function quantityValidate(req, res, next) {
    const sales = req.body;
    const quantityExists = sales.every((sale) => sale.quantity !== undefined);
    if (!quantityExists) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    const quantityGreaterThanZero = sales.every((sale) => sale.quantity > 0);
    if (!quantityGreaterThanZero) {
      return res.status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
  }
  
  module.exports = {
    idValidate,
    quantityValidate,
  };