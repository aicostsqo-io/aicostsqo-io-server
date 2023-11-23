const express = require('express'),
  router = express.Router();

const authenticateToken = require('../middlewares/authenticate');

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./users.routes'));
router.use('/siteBounds', authenticateToken, require('./siteBounds.routes'));
router.use('/fields', authenticateToken, require('./sites.routes'));
router.use('/rps', authenticateToken, require('./rps.routes'));
router.use('/gprs', authenticateToken, require('./gprs.routes'));
router.use(
  '/magnetometrics',
  authenticateToken,
  require('./magnetometrics.routes')
);
router.use(
  '/resistivities',
  authenticateToken,
  require('./resistivities.routes')
);
router.use('/seismics', authenticateToken, require('./seismics.routes'));
router.use('/televiewers', authenticateToken, require('./televiewers.routes'));
router.use('/rp-discs', require('./rpDiscs.routes'));

module.exports = router;
