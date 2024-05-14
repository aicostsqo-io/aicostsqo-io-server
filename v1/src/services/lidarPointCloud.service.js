const LidarPointCloud = require('../models/lidarPointCloud.model');

const getBySiteId = async (siteId) => {
  const lidarPointClouds = await LidarPointCloud.find({ siteId });
  if (lidarPointClouds) return lidarPointClouds;
  throw new Error('Lidar point clouds not found');
};

const insert = async (data) => {
  const created = await LidarPointCloud.create(data);
  if (created) return created;
  throw new Error('Data can not created');
};

module.exports = {
  getBySiteId,
  insert,
};
