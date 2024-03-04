const Joi = require('joi');
const id = Joi.number().integer().required();
const createTransactionSchema = Joi.object({
  paymentId: Joi.number().integer().required(),
  transactionCode: Joi.string(),
  status: Joi.string().valid('success', 'refund', 'failure').required(),
  amount: Joi.number().precision(2).required(),
});

module.exports = { createTransactionSchema };
