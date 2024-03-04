const express = require('express');

const userRouter = require('./users.router');
const authRouter = require('./auth.router');
const riderRouter = require('./riders.router');
const driverRouter = require('./drivers.router');
const rideRouter = require('./rides.router');
const transactionsRouter = require('./transactions.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/users', userRouter);
  router.use('/riders', riderRouter);
  router.use('/drivers', driverRouter);
  router.use('/rides', rideRouter);
  router.use('/transactions', transactionsRouter);
}

module.exports = routerApi;
