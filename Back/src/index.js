require('rootpath')();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./_middleware/error-handler');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', require('./controllers/users.controller'));
app.use('/api/clients', require('./controllers/clients.controller'));
app.use('/api/services', require('./controllers/services.controller'));
app.use('/api/appointments', require('./controllers/appointments.controller'));

app.use(errorHandler);

const server = app.listen(
    PORT,
    () => console.log('Server started at port ', PORT))

module.exports = server