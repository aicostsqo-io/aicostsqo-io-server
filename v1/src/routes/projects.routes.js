const express = require('express');
const { index, create } = require('../controllers/projects.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');

const router = express.Router();

router.route('/').get(errorCatcher(index));
router.route('/').post(errorCatcher(create));

module.exports = router;
