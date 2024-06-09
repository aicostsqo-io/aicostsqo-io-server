const MagnetometricDisc = require('../models/magnetometricDisc.model');

const insertDiscs = async (magnetometricDiscData) => {
  const magnetometricDiscs = await MagnetometricDisc.insertMany(
    magnetometricDiscData
  );
  if (magnetometricDiscs) return magnetometricDiscs;
  throw new Error('MagnetometricDiscs are not created');
};

const insert = async (data) => {
  const created = await MagnetometricDisc.create(data);
  if (created) return created;
  throw new Error('Data can not created');
};

const getBySiteId = async (siteId) => {
  const magnetometricDiscs = await MagnetometricDisc.find({ siteId });
  if (magnetometricDiscs) return magnetometricDiscs;
  throw new Error('Magnetometric discs not found');
};

module.exports = {
  insertMagnetometricDiscs: insertDiscs,
  getBySiteId,
  insert,
};
