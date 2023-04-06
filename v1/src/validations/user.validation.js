const Joi = require("joi");

const createValidation = Joi.object({
  full_name: Joi.string().required().min(2),
  password: Joi.string().required().min(5),
  email: Joi.string().email().required().min(8),
});

const loginValidation = Joi.object({
  password: Joi.string().required().min(5),
  email: Joi.string().email().required().min(8),
});

const updateValidation = Joi.object({
  full_name: Joi.string().min(2),
  email: Joi.string().email().min(8),
});

module.exports = {
  createValidation,
  loginValidation,
  updateValidation,
};
