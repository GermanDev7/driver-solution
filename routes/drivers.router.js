const express = require('express');

const driverController=require('../controllers/driver.controller')
const router = express.Router();


//list drivers
router.get('/',  driverController.findAllDrivers);
router.get('/:id', driverController.findDriverById);



module.exports = router;
