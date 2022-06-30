const connection = require('./connection');

const getAllSales = async () => {
    const [sales] = await connection.query(
        `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
        FROM sales_products sp
        INNER JOIN sales s ON sp.sale_id = s.id`,
      );
    return sales;
};

const getSaleById = async (id) => {
    const sale = await connection.query(
        `SELECT s.date, sp.product_id AS productId, sp.quantity
        FROM sales_products sp
        INNER JOIN sales s ON sp.sale_id = s.id
        WHERE sp.sale_id = ?`, [id],
      );
    return sale;
};

async function storeSale() {
  const [sales] = await connection.execute(
      'INSERT INTO sales SET date = ?', [new Date()],
  );
  return sales.insertId;
}
async function storeSaleProduct(idSales, sale) {
  await connection.execute(
      'INSERT INTO sales_products SET sale_id = ?, product_id = ?, quantity = ?',
      [idSales, sale.productId, sale.quantity],
  );
  return {
      productId: sale.productId,
      quantity: sale.quantity,
  };
}

async function update(salesId, sale) {
  await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [sale.quantity, salesId, sale.productId],
  );
  return {
    productId: sale.productId,
    quantity: sale.quantity,
  };
}

const deleteSale = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
};

module.exports = {
    getAllSales,
    getSaleById,
    storeSale,
    storeSaleProduct,
    update,
    deleteSale,
};