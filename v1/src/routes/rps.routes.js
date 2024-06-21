const express = require('express');
const {
  index,
  create,
  update,
  bulkDelete,
  bulkInsert,
  getBySiteBoundId,
  distributionCurves,
  exportBySiteBoundToExcel,
  getExcelTemplate,
  importFromXlsx,
} = require('../controllers/rps.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');
const rpValidation = require('../validations/rp.validation');
const validate = require('../middlewares/validate');

const router = express.Router();

router.route('/').get(errorCatcher(index));
router.route('/:rpId').put(errorCatcher(update));
router.route('/:siteBoundId').get(errorCatcher(getBySiteBoundId));
router.route('/').post(errorCatcher(create));
router.route('/bulk-delete').post(errorCatcher(bulkDelete));
router.route('/manual').post(errorCatcher(bulkInsert));
router
  .route('/export/by-site-bound/:sitedBoundId')
  .get(errorCatcher(exportBySiteBoundToExcel));
router
  .route('/distribution-curves')
  .post(
    validate(rpValidation.distributionCurves),
    errorCatcher(distributionCurves)
  );
router.route('/import/xlsx-template').get(errorCatcher(getExcelTemplate));
router.route('/import/from-xlsx').post(errorCatcher(importFromXlsx));

module.exports = router;
