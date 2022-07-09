const connection = require('./connection');

const getAllProd = async () => {
    const [products] = await connection.execute('SELECT * FROM products ORDER BY id');
    return products;
};

const getProdById = async (id) => {
    const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return product;
};

const storeProduct = async (product) => {
    const [newProduct] = await connection.execute(
        'INSERT INTO products SET name = ?, quantity = ?',
        [product.name, product.quantity],
    );
    return {
        id: newProduct.insertId,
        name: product.name,
        quantity: product.quantity,
    };
};

const checkIfNameExist = async (name) => {
    const [product] = await connection.query('SELECT * FROM products WHERE name = ?', [name]);
    return product[0] !== undefined;
};

const updateProduct = async (id, product) => {
    await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [product.name, id],
    );
    return {
        id,
        name: product.name,
    };
};

const deleteProduct = async (id) => {
    await connection.execute('DELETE FROM products WHERE id = ?', [id]);
    return { status: 204 };
};

module.exports = {
    getAllProd,
    getProdById,
    storeProduct,
    checkIfNameExist,
    updateProduct,
    deleteProduct,
};