const express = require('express');
const {
  index,
  create,
  bulkDelete,
  bulkInsert,
  getBySiteBoundId,
  distributionCurves,
} = require('../controllers/rps.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');
const rpValidation = require('../validations/rp.validation');
const validate = require('../middlewares/validate');

const router = express.Router();

router.route('/').get(errorCatcher(index));
router.route('/:siteBoundId').get(errorCatcher(getBySiteBoundId));
router.route('/').post(errorCatcher(create));
router.route('/bulk-delete').post(errorCatcher(bulkDelete));
router.route('/manual').post(errorCatcher(bulkInsert));
router
  .route('/distribution-curves')
  .post(
    validate(rpValidation.distributionCurves),
    errorCatcher(distributionCurves)
  );

module.exports = router;
