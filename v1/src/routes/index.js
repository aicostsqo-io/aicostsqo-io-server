const express = require("express"),
  router = express.Router();

const authenticateToken = require("../middlewares/authenticate");

router.use("/auth", require("./auth.routes"));
router.use("/users", require("./users.routes"));
router.use("/siteBounds", authenticateToken, require("./siteBounds.routes"));
router.use("/fields", authenticateToken, require("./sites.routes"));
router.use("/rps", authenticateToken, require("./rps.routes"));

module.exports = router;
