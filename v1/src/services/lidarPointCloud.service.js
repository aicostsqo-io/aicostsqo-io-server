var mongoose = require('mongoose');
const LidarPointCloud = require('../models/lidarPointCloud.model');

const getBySiteId = async (siteId) => {
  const lidarPointClouds = await LidarPointCloud.find({ siteId });
  if (lidarPointClouds) return lidarPointClouds;
  throw new Error('Lidar point clouds not found');
};

module.exports = {
  getBySiteId,
};
