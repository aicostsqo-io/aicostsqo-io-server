const express = require('express');
const {
  index,
  listByRpId,
  create,
  bulkDelete,
} = require('../controllers/discs.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');

const router = express.Router();

router.route('/').get(errorCatcher(index));
router.route('/').post(errorCatcher(create));
router.route('/:id').get(errorCatcher(listByRpId));
router.route('/bulk-delete').post(errorCatcher(bulkDelete));

module.exports = router;
