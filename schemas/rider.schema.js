const Joi = require('joi');
const id = Joi.number().integer().required();
const createRiderSchema = Joi.object({
  userId: Joi.number().integer().required(),
  preferredPaymentMethod: Joi.string(),
  isAvailable: Joi.boolean().required(),
  rating: Joi.number().min(0).max(5),
  rideCounts: Joi.number().min(0),
});



module.exports = { createRiderSchema };
