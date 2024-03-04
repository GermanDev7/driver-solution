const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const role = '';
      if (user.driver) {
        role += 'driver,';
      }
      if (user.rider) {
        role += 'rider';
      }
      //firma jwt

      const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;





