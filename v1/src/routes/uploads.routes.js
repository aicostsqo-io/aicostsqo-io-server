const express = require('express');
const { upload } = require('../controllers/uploads.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');
const authenticateToken = require('../middlewares/authenticate');

const router = express.Router();

router.route('/').post(authenticateToken, errorCatcher(upload));

module.exports = router;
