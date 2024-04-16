const express = require('express');
const {
  getBySiteId,
  exportBySiteId,
} = require('../controllers/magnetometrics.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');

const router = express.Router();

router.route('/by-site/:siteId').get(errorCatcher(getBySiteId));
router.route('/export/by-site/:siteId').get(errorCatcher(exportBySiteId));

module.exports = router;
