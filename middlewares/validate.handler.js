const Joi = require('joi');

// Middleware generic validate
function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };
}

module.exports = { validate };
