const express = require('express');

const userRouter = require('./users.router');
const ridesRouter = require('./rides.router');
const transactionsRouter = require('./transactions.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', userRouter);
  router.use('/rides', ridesRouter);
  router.use('/transactions', transactionsRouter);
}

module.exports = routerApi;
