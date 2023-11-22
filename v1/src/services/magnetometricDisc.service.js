const MagnetometricDisc = require('../models/magnetometricDisc.model');

const insertDiscs = async (magnetometricDiscData) => {
  const magnetometricDiscs = await MagnetometricDisc.insertMany(
    magnetometricDiscData
  );
  if (magnetometricDiscs) return magnetometricDiscs;
  throw new Error('MagnetometricDiscs are not created');
};

const getBySiteId = async (siteId) => {
  const magnetometricDiscs = await MagnetometricDisc.find({ siteId });
  if (magnetometricDiscs) return magnetometricDiscs;
  throw new Error('Magnetometric discs not found');
};

module.exports = {
  insertMagnetometricDiscs: insertDiscs,
  getBySiteId,
};
