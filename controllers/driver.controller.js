const DriverService = require('../services/driver.service');

const service = new DriverService();
const findAllDrivers = async (req, res,next) => {
  try {
    const drivers = await service.find();
    res.json(drivers);
  } catch (error) {
   next(error)
  }
};

const findDriverById = async (req, res, next) => {
  try {
    const driver = await service.findOne(req.params.id);
    res.json(driver);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllDrivers,
  findDriverById,
};
