require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// rotas da api
app.use('/users', require('./users/users.controller'));
app.use('/products', require('./products/products.controller'));

// handler global para erros
app.use(errorHandler);

// inicializa servidor
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Servidor rodando na porta ' + port));