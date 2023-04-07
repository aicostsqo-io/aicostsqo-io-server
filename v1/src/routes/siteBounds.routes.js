const express = require("express");
const { index, create } = require("../controllers/siteBound.controller");

const router = express.Router();

router.route("/").post(create).get(index);

module.exports = router;