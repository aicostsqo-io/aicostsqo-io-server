const express = require('express');
const { exportByRpId } = require('../controllers/maxQuboits.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');
const router = express.Router();

router.route('/export/by-rp/:rpId').get(errorCatcher(exportByRpId));

module.exports = router;
