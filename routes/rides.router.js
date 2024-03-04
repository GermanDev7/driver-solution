const express = require('express');
const rideController = require('../controllers/ride.controller');
const router = express.Router();
const { checkRoles } = require('../middlewares/auth.handler');
const { endRideSchema, initRideSchema } = require('../schemas/ride.schema');
const { validate } = require('../middlewares/validate.handler');

//list rides
router.get('/', rideController.findAllRides);
router.get('/:id', rideController.findRideById);
//create ride
router.post('/',validate(initRideSchema), checkRoles('rider'), rideController.createRide);
router.post('/endRide',validate(endRideSchema), checkRoles('driver'), rideController.endRide);

module.exports = router;
