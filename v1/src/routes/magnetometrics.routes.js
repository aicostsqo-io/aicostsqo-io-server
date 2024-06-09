const express = require('express');
const {
  getBySiteId,
  exportBySiteId,
  getExcelTemplate,
  importFromXlsx,
} = require('../controllers/magnetometrics.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');

const router = express.Router();

router.route('/by-site/:siteId').get(errorCatcher(getBySiteId));
router.route('/export/by-site/:siteId').get(errorCatcher(exportBySiteId));
router.route('/import/xlsx-template').get(errorCatcher(getExcelTemplate));
router.route('/import/from-xlsx').post(errorCatcher(importFromXlsx));

module.exports = router;
