const express = require('express');
const {
  index,
  listByRpId,
  create,
} = require('../controllers/discs.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');

const router = express.Router();

router.route('/').get(errorCatcher(index));
router.route('/').post(errorCatcher(create));
router.route('/:id').get(errorCatcher(listByRpId));

module.exports = router;
