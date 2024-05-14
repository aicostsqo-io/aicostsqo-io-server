const LidarJointSet = require('../models/lidarJointSet.model');

const getBySiteId = async (siteId) => {
  const lidarJointSets = await LidarJointSet.find({ siteId });
  if (lidarJointSets) return lidarJointSets;
  throw new Error('Lidar joint sets not found');
};

const insert = async (data) => {
  const created = await LidarJointSet.create(data);
  if (created) return created;
  throw new Error('Data can not created');
};

module.exports = {
  getBySiteId,
  insert,
};
