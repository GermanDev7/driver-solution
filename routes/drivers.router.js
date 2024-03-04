const express = require('express');

const driverController=require('../controllers/driver.controller')
const router = express.Router();


//list drivers
router.get('/',  driverController.findAllDrivers);

router.get('/:id', driverController.findDriverById);

//create Ride
router.get('/createRide', (req, res, next) => {
  res.json('riders');
});


module.exports = router;
