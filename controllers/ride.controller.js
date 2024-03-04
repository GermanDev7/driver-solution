const RideService = require('../services/ride.service');
const boom = require('@hapi/boom');

const service = new RideService();
const findAllRides = async (req, res, next) => {
  try {
    const rides = await service.find();
    res.json(rides);
  } catch (error) {
    next(error);
  }
};

const findRideById = async (req, res, next) => {
  try {
    const ride = await service.findOne(req.params.id);
    res.json(ride);
  } catch (error) {
    next(error);
  }
};

const createRide = async (req, res, next) => {
  try {
    if (req.user.user.rider.id == req.body.riderId) {
      const ride = await service.create(req.body);
      res.json(ride);
    } else {
      next(boom.unauthorized('This service must be created for itself'));
    }
  } catch (error) {
    next(error);
  }
};

const endRide = async (req, res, next) => {
  try {
    if (req.user.user.driver.id == req.body.driverId) {
      const ride = await service.endRide(req.body);
      res.json(ride);
    } else {
      next(boom.unauthorized('This service must be created for itself'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRide,
  findAllRides,
  findRideById,
  endRide,
};
