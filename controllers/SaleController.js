const saleService = require('../services/sales');

const getAll = async (req, res) => {
    try {
        const sales = await saleService.getAll();
        return res.status(200).json(sales);
    } catch (error) {
        return res.status(500).json({ message: 'Erro de conexão' });
    }
};

const getById = async ({ params: { id } }, res) => {
    try {
        const selectSale = await saleService.getById(id);
        if (selectSale[0].date === undefined) {
            return res.status(404).json({ message: 'AAAAA' });
        }
        return res.status(200).json(selectSale);
    } catch (error) {
        return res.status(404).json({ message: 'Sale not found' });
    }
};

// async function store(req, res) {
//     const sales = await saleService.saleStore(req.body);
//     const id = sales.itemsSold[0].productId;
//     const product = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
//     if (sales.itemsSold[0].quantity > product[0][0].quantity) {
//         res.status(422).json({ message: 'Such amount is not permitted to sell' });
//     } else {
//         res.status(201).json(sales);
//     }
// }

async function update(req, res) {
    const { id } = req.params;
    const sales = await saleService.update(parseInt(id, 10), req.body);
    res.status(200).json(sales);
}

async function deleteSale(req, res) {
    const { id } = req.params;
    const sale = await saleService.getById(parseInt(id, 10));
    if (sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    await saleService.deleteSale(parseInt(id, 10));
    res.status(204).send();
}

module.exports = {
    getAll,
    getById,
    // store,
    update,
    deleteSale,
};