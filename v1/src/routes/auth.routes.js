const { login } = require("../controllers/auth.controller");
const validate = require("../middlewares/validate");
const errorCatcher = require("../scripts/utils/errorCatcher");
const userValidation = require("../validations/user.validation");
const express = require("express");

const router = express.Router();

router
  .route("/login")
  .post(validate(userValidation.login), errorCatcher(login));

module.exports = router;
