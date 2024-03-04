const express = require('express');
const passport = require('passport');

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
  router.use(
    '/users',
    passport.authenticate('jwt', { session: false }),
    userRouter
  );
  router.use('/riders',passport.authenticate('jwt', { session: false }), riderRouter);
  router.use('/drivers',passport.authenticate('jwt', { session: false }), driverRouter);
  router.use('/rides',passport.authenticate('jwt', { session: false }), rideRouter);
  router.use('/transactions', passport.authenticate('jwt', { session: false }), transactionsRouter);
}

module.exports = routerApi;
