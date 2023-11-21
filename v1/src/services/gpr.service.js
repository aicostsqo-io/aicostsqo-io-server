const Gpr = require('../models/gpr.model');

const insert = async (gprData) => {
  const gpr = await Gpr.create(gprData);
  if (gpr) return gpr;
  throw new Error('Gpr not created');
};

const getBySiteId = async (siteId) => {
  const gprs = await Gpr.find({ siteId });
  if (gprs) return gprs;
  throw new Error('Gprs not found');
};

module.exports = {
  insertGpr: insert,
  getBySiteId,
};
