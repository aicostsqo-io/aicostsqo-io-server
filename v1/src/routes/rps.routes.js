const express = require('express');
const {
  index,
  create,
  bulkDelete,
  getBySiteBoundId,
} = require('../controllers/rps.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');

const router = express.Router();

router.route('/').get(errorCatcher(index));
router.route('/:siteBoundId').get(errorCatcher(getBySiteBoundId));
router.route('/').post(errorCatcher(create));
router.route('/bulk-delete').post(errorCatcher(bulkDelete));

module.exports = router;
