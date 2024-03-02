const express = require('express');

//const UserService=require
//validatorHandler
//const {updateUserSchema,createUser}

const router = express.Router();
//const service=new UserService()

//list users
router.get('/', (req, res, next) => {
  res.json('transactions');
});

module.exports = router;
