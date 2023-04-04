const Joi = require("joi");

const createValidation = Joi.object({
  password: Joi.string().required().min(8),
  email: Joi.string().email().required().min(8),
});

const loginValidation = Joi.object({
  password: Joi.string().required().min(8),
  email: Joi.string().email().required().min(8),
});

const updateValidation = Joi.object({
  email: Joi.string().email().min(8),
});

module.exports = {
  createValidation,
  loginValidation,
  updateValidation,
};
