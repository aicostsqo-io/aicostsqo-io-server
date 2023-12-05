const express = require('express');
const { upload } = require('../controllers/uploads.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');

const router = express.Router();

router.route('/').post(errorCatcher(upload));

module.exports = router;
