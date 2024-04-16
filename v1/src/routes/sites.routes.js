const express = require('express');
const {
  list,
  create,
  get,
  manual,
  exportMySitesToExcel,
} = require('../controllers/site.controller');
const errorCatcher = require('../scripts/utils/errorCatcher');
const authenticateToken = require('../middlewares/authenticate');

const router = express.Router();

router.route('/').post(errorCatcher(create)).get(errorCatcher(list));
router
  .route('/export/my')
  .get(authenticateToken, errorCatcher(exportMySitesToExcel));
router.route('/:id').get(errorCatcher(get));
router.route('/manual').post(errorCatcher(manual));

module.exports = router;
