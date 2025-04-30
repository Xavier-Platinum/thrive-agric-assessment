const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const routes = require('#root/src/interfaces/http/routes/routes.js');
const { requestsHandler } = require('#root/src/interfaces/http/middlewares/requests/index.js');
const { errorHandler } = require('#root/src/interfaces/http/middlewares/errors/index.js');
// const bodyParser = require('body-parser');
// const routes = require('./routes');

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
app.use(requestsHandler);
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
