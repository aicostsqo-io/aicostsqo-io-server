const express = require('express');
const { getBySiteId } = require('../controllers/magnetometrics.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');

const router = express.Router();

router.route('/by-site/:siteId').get(errorCatcher(getBySiteId));

module.exports = router;
