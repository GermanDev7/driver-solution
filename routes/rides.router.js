const express = require('express');
const rideController = require('../controllers/ride.controller');
const router = express.Router();

//list rides
router.get('/', rideController.findAllRides);
router.get('/:id', rideController.findRideById);
//create ride
router.post('/', rideController.createRide);
router.post('/endRide', rideController.endRide);

module.exports = router;
