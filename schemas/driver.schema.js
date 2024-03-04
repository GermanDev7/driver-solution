const Joi = require('joi');
const id = Joi.number().integer().required();
const createDriverSchema = Joi.object({
  userId: Joi.number().integer().required(),
  licenseNumber: Joi.string(),
  vehicleType: Joi.string().required(), // Ejemplo: "Car", "Motorcycle"
  isAvailable: Joi.boolean().required(),
  rating: Joi.number().min(0).max(5),
  rideCounts: Joi.number().min(0),
});



module.exports = { createDriverSchema };
