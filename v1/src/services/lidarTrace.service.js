const LidarTrace = require('../models/lidarTrace.model');

const getBySiteId = async (siteId) => {
  const lidarTraces = await LidarTrace.find({ siteId });
  if (lidarTraces) return lidarTraces;
  throw new Error('Lidar traces not found');
};

const insert = async (data) => {
  const created = await LidarTrace.create(data);
  if (created) return created;
  throw new Error('Data can not created');
};

module.exports = {
  getBySiteId,
  insert,
};
