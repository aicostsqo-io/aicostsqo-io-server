const express = require('express');
const errorCatcher = require('../scripts/utils/errorCatcher');
const {
  getByRpId,
  create,
  getById,
} = require('../controllers/dfns.controller');

const router = express.Router();

router.route('/').post(errorCatcher(create));
router.route('/:id').get(errorCatcher(getById));
router.route('/by-rp/:rpId').get(errorCatcher(getByRpId));

module.exports = router;
