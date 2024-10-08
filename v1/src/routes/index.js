const express = require('express'),
  router = express.Router();

const authenticateToken = require('../middlewares/authenticate');

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./users.routes'));
router.use('/siteBounds', authenticateToken, require('./siteBounds.routes'));
router.use('/fields', require('./sites.routes'));
router.use('/projects', authenticateToken, require('./projects.routes'));
router.use('/rps', require('./rps.routes'));
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
router.use('/uploads', require('./uploads.routes'));
router.use('/scanlines', require('./scanlines.routes'));
router.use('/joint-sets', require('./jointSets.routes'));
router.use('/lidars', require('./lidars.routes'));
router.use('/max-quboits', require('./maxQuboits.routes'));
router.use('/polyhedrons', require('./polyhedrons.routes'));
router.use('/dfns', require('./dfns.routes'));

module.exports = router;
