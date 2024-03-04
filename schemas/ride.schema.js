const Joi = require('joi');
const id = Joi.number().integer().required();
const rideId = Joi.number().integer().required();
const riderId = Joi.number().integer().required();
const paymentId = Joi.number().integer();
const driverId = Joi.number().integer().required();
const startLat = Joi.number().min(-90).max(90).required();
const startLong = Joi.number().min(-180).max(180).required();
const endLat = Joi.number().min(-90).max(90).required();
const endLong = Joi.number().min(-180).max(180).required();
const startTime = Joi.date().required();
const endTime = Joi.date();
const status = Joi.string().valid('Started', 'Ended').required();
const endRideSchema = Joi.object({
  rideId: rideId,
  driverId: driverId,
  endLat: endLat,
  endLong: endLong,
});
const initRideSchema = Joi.object({
  riderId: riderId,
  startLat: startLat,
  startLong: startLong,
  endLat: endLat,
  endLong: endLong,
  status:status
});

const createRideSchema = Joi.object({
  rideId: rideId,
  driverId: driverId,
  startLat: startLat,
  startLong: startLong,
  endLat: endLat,
  endLong: endLong,
  status: status,
  startTime: startTime,
  endTime: endTime,
});



module.exports = { createRideSchema, initRideSchema, endRideSchema};
