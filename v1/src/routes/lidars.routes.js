const express = require('express');
const { exportBySiteId } = require('../controllers/lidars.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');
const router = express.Router();

router.route('/export/by-site/:siteId').get(errorCatcher(exportBySiteId));

module.exports = router;
