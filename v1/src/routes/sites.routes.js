const express = require("express");
const { index, create } = require("../controllers/site.controller");

const router = express.Router();

router.route("/").post(create).get(index);

module.exports = router;