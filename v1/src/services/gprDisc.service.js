const GprDisc = require('../models/gprDisc.model');

const insertDiscs = async (gprDiscData) => {
  const gprDiscs = await GprDisc.insertMany(gprDiscData);
  if (gprDiscs) return gprDiscs;
  throw new Error('GprDiscs are not created');
};

const getBySiteId = async (siteId) => {
  const gprDiscs = await GprDisc.find({ siteId });
  if (gprDiscs) return gprDiscs;
  throw new Error('Gpr discs not found');
};

module.exports = {
  insertGprDiscs: insertDiscs,
  getBySiteId,
};
