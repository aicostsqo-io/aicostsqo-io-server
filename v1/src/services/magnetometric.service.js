const Magnetometric = require('../models/magnetometric.model');

const insert = async (magnetometricData) => {
  const magnetometric = await Magnetometric.create(magnetometricData);
  if (magnetometric) return magnetometric;
  throw new Error('Magnetometric not created');
};

const getBySiteId = async (siteId) => {
  const magnetometrics = await Magnetometric.find({ siteId });
  if (magnetometrics) return magnetometrics;
  throw new Error('Magnetometrics not found');
};

module.exports = {
  insertMagnetometric: insert,
  getBySiteId,
};
