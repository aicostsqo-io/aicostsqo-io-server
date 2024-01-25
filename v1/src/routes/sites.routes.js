const express = require('express');
const { list, create, get, manual } = require('../controllers/site.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');

const router = express.Router();

router.route('/').post(errorCatcher(create)).get(errorCatcher(list));
router.route('/:id').get(errorCatcher(get));
router.route('/manual').post(errorCatcher(manual));

module.exports = router;
