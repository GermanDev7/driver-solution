const Joi = require('joi');
const id = Joi.number().integer().required();
const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().required(),
  phone: Joi.string(),
  birthDate: Joi.date().less('now').required(),
  sex: Joi.string().valid('Male', 'Female'),
});


module.exports = { createUserSchema };
