const Joi = require("joi");

module.exports = {
  create: Joi.object().keys({
    username: Joi.string().required().min(2),
    password: Joi.string().required().min(5),
    email: Joi.string().email().required().min(5),
  }),
  login: Joi.object().keys({
    password: Joi.string().required().min(5),
    email: Joi.string().email().required().min(8),
  }),
  update: Joi.object().keys({
    email: Joi.string().email().min(8),
  }),
};
