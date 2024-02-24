const OutputVolumes = require('../models/outputVolume.model');

const bulkInsert = async (data) => {
  return await OutputVolumes.insertMany(data);
};

const getByRp = async (rpId) => {
  const res = await OutputVolumes.find({
    rpId,
    volumeTheoric: { $gte: 1 },
    volumeQuarry: { $gte: 1 },
    totalVolumeOfMaxQs: { $gte: 1 },
  }).sort({
    polyhedronId: 1,
  });
  return res;
};

module.exports = {
  getByRp,
  bulkInsert,
};
