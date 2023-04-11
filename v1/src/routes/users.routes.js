const schemas = require("../validations/user.validation");
const validate = require("../middlewares/validate");
const express = require("express");
const {
  create,
  index,
  login,
  update,
  deleteUser,
} = require("../controllers/users.controller");
const authenticateToken = require("../middlewares/authenticate");
const errorCatcher = require("../scripts/utils/errorCatcher");
const router = express.Router();

router.route("/").get(errorCatcher(index));
router
  .route("/")
  .post(validate(schemas.createValidation), errorCatcher(create));
router
  .route("/")
  .patch(
    authenticateToken,
    validate(schemas.updateValidation),
    errorCatcher(update)
  );
router
  .route("/login")
  .post(validate(schemas.loginValidation), errorCatcher(login));
router.route("/:id").delete(authenticateToken, errorCatcher(deleteUser));

module.exports = router;
