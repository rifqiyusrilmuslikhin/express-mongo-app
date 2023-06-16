/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./config/db');
const errorMiddleware = require('./middleware/ErrorMiddleware');

const app = express();

connectToDB();

app.use(cors());
app.use(express.json());

require('./routes/CityRoutes')(app);
require('./routes/AccountRoutes')(app);

app.use(errorMiddleware);

module.exports = app;