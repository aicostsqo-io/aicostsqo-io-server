const express = require("express");
const { index, create } = require("../controllers/site.controller");
const errorCatcher = require("../scripts/utils/errorCatcher");

const router = express.Router();

router.route("/").post(errorCatcher(create)).get(errorCatcher(index));

module.exports = router;
