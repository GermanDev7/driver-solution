const RiderService = require('../services/rider.service');

const service = new RiderService();
const findAllRiders = async (req, res,next) => {
  try {
    const riders = await service.find();
    res.json(riders);
  } catch (error) {
   next(error)
  }
};

const findRiderById = async (req, res, next) => {
  try {
    const rider = await service.findOne(req.params.id);
    res.json(rider);
  } catch (error) {
    next(error);
  }
};



module.exports = {
  findAllRiders,
  findRiderById,
};
