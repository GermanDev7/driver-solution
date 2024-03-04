const express = require('express');
const userController = require('../controllers/user.controller');

//validatorHandler


const router = express.Router();


//list users
router.get('/',  userController.findAllUsers);

router.get('/:id', userController.findUserById);


module.exports = router;
