const express = require('express')
const cors = require('cors')
const app = express()
require('rootpath')();
const bodyParser = require('body-parser');
const errorHandler = require('./_middleware/error-handler');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// Coloca el nombre del archivo que contiene sus respectivas rutas
//app.use('/users', require('./users/users.controller'));

app.use(errorHandler);

// Se importan cada una de las rutas
//app.use('/api', routes.map(r => require(`./routes/${r}`)))

app.use('/api/users', require('./controllers/users.controller'));

const server = app.listen(
    PORT,
    () => console.log('Servidor iniciado en el puerto', PORT))

module.exports = server