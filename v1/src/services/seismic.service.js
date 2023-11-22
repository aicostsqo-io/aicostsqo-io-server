const Seismic = require('../models/seismic.model');

const insert = async (seismicData) => {
  const seismic = await Seismic.create(seismicData);
  if (seismic) return seismic;
  throw new Error('Seismic not created');
};

const getBySiteId = async (siteId) => {
  const seismics = await Seismic.find({ siteId });
  if (seismics) return seismics;
  throw new Error('Seismics not found');
};

module.exports = {
  insertSeismic: insert,
  getBySiteId,
};
