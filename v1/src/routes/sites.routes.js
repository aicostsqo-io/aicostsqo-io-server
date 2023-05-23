const express = require("express");
const { list, create, get } = require("../controllers/site.controller");
const errorCatcher = require("../scripts/utils/errorCatcher");

const router = express.Router();

router.route("/").post(errorCatcher(create)).get(errorCatcher(list));
router.route("/:id").get(errorCatcher(get));

module.exports = router;
