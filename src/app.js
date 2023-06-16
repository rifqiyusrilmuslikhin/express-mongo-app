const express = require('express');
const { connectToDB } = require('./config/db');
const errorMiddleware = require('./middleware/ErrorMiddleware');

const app = express();

connectToDB();

app.use(express.json());

require('./routes/CityRoutes')(app);
require('./routes/AccountRoutes')(app);

app.use(errorMiddleware);

module.exports = app;