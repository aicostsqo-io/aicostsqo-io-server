const GprDisc = require('../models/gprDisc.model');

const insertDiscs = async (gprDiscData) => {
  const gprDiscs = await GprDisc.insertMany(gprDiscData);
  if (gprDiscs) return gprDiscs;
  throw new Error('GprDiscs are not created');
};

module.exports = {
  insertGprDiscs: insertDiscs,
};
