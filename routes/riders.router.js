const express = require('express');

const riderController=require('../controllers/rider.controller')
const router = express.Router();


//list riders
router.get('/',  riderController.findAllRiders);
router.get('/:id', riderController.findRiderById);


module.exports = router;
