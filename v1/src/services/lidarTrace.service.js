var mongoose = require('mongoose');
const LidarTrace = require('../models/lidarTrace.model');

const getBySiteId = async (siteId) => {
  const lidarTraces = await LidarTrace.find({ siteId });
  if (lidarTraces) return lidarTraces;
  throw new Error('Lidar traces not found');
};

module.exports = {
  getBySiteId,
};
