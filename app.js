const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/ProductController');
const SaleController = require('./controllers/SaleController');
const productsMid = require('./middlewares/productsMiddleware');
const salesMid = require('./middlewares/salesMiddleware');

const app = express();
app.use(bodyParser.json());

// não remva esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('Alguma coisa');
});

app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getById);

app.post('/products',
productsMid.nameValidate,
productsMid.quantityValidate,
ProductController.store);

app.put('/products/:id',
productsMid.nameValidate,
productsMid.quantityValidate,
ProductController.update);

app.delete('/products/:id', ProductController.deleteProd);
app.delete('/sales/:id', SaleController.deleteSale);

app.get('/sales', SaleController.getAll);
app.get('/sales/:id', SaleController.getById);

app.post('/sales',
salesMid.idValidate,
salesMid.quantityValidate,
SaleController.store);

app.put('/sales/:id',
salesMid.idValidate,
salesMid.quantityValidate,
SaleController.update);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
