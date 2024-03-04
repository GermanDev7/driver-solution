const Joi = require('joi');
const id = Joi.number().integer().required();
const createPaymentSchema = Joi.object({
  userId: Joi.number().integer().required(),
  rideId: Joi.number().integer().required(),
  amount: Joi.number().precision(2).required(),
  status: Joi.string().valid('pending', 'processed', 'failed').required(),
});

const getPaymentSchema = Joi.object({
  id: id,
});
module.exports = { createPaymentSchema,getPaymentSchema };
