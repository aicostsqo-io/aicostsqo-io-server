const Gpr = require('../models/gpr.model');

const insert = async (gprData) => {
  const gpr = await Gpr.create(gprData);
  if (gpr) return gpr;
  throw new Error('Gpr not created');
};

module.exports = {
  insertGpr: insert,
};
