const express = require('express');

//const UserService=require
//validatorHandler
//const {updateUserSchema,createUser}

const router = express.Router();
//const service=new UserService()

//list users
router.get('/', (req, res, next) => {
  res.json('users');
});

//list users
router.post('/', (req, res, next) => {
  res.json('users');
});

router.delete('/', (req, res, next) => {
  res.json('users');
});

module.exports = router;
