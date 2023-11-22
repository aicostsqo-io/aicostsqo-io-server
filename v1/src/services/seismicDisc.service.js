const SeismicDisc = require('../models/seismicDisc.model');

const insertDiscs = async (seismicDiscData) => {
  const seismicDiscs = await SeismicDisc.insertMany(seismicDiscData);
  if (seismicDiscs) return seismicDiscs;
  throw new Error('SeismicDiscs are not created');
};

const getBySiteId = async (siteId) => {
  const seismicDiscs = await SeismicDisc.find({ siteId });
  if (seismicDiscs) return seismicDiscs;
  throw new Error('Seismic discs not found');
};

module.exports = {
  insertSeismicDiscs: insertDiscs,
  getBySiteId,
};
