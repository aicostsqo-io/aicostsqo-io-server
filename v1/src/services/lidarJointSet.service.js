const LidarJointSet = require('../models/lidarJointSet.model');

const getBySiteId = async (siteId) => {
  const lidarJointSets = await LidarJointSet.find({ siteId });
  if (lidarJointSets) return lidarJointSets;
  throw new Error('Lidar joint sets not found');
};

module.exports = {
  getBySiteId,
};
