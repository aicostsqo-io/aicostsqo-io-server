const express = require('express');
const { index, listByRpId } = require('../controllers/discs.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');

const router = express.Router();

router.route('/').get(errorCatcher(index));
router.route('/:id').get(errorCatcher(listByRpId));

module.exports = router;
