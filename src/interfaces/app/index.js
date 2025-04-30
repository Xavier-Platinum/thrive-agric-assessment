const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const routes = require('../http/routes/routes');
// const bodyParser = require('body-parser');
// const routes = require('./routes');
require('dotenv').config();

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

module.exports = app;
