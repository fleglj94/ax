require('dotenv').config();
require('./configuration/db').connect();

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
const authRoute = require('./router');
app.use('/api/v1', authRoute);


module.exports = app;