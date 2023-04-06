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
const router = express.Router();

router.route("/").get(index);
router.route("/").post(validate(schemas.createValidation), create);
router
  .route("/")
  .patch(authenticateToken, validate(schemas.updateValidation), update);
router.route("/login").post(validate(schemas.loginValidation), login);
router.route("/:id").delete(authenticateToken, deleteUser);

module.exports = router;
