const UserValidation = require("../validations/user.validation");
const validate = require("../middlewares/validate");
const express = require("express");
const {
  create,
  index,
  update,
  deleteUser,
} = require("../controllers/users.controller");
const errorCatcher = require("../scripts/utils/errorCatcher");
const authenticateToken = require("../middlewares/authenticate");

const router = express.Router();

router.route("/").get(errorCatcher(index));
router
  .route("/")
  .post(validate(UserValidation.create), errorCatcher(create));
router
  .route("/")
  .patch(
    authenticateToken,
    validate(UserValidation.update),
    errorCatcher(update)
  );
router.route("/:id").delete(authenticateToken, errorCatcher(deleteUser));

module.exports = router;
