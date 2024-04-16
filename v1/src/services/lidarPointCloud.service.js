var mongoose = require('mongoose');
const LidarPointCloud = require('../models/lidarPointCloud.model');

const getBySiteId = async (siteId) => {
  const constSiteId = new mongoose.Types.ObjectId('65b356d89f5a66aefdce5ee8');

  await LidarPointCloud.insertMany([
    {
      siteId: constSiteId,
      vertexId: 1,
      jointSetNumber: 1,
      discontiunityPlaneNumber: 1,
      positionX: 50,
      positionY: 100,
      positionZ: 30,
    },
    {
      siteId: constSiteId,
      vertexId: 2,
      jointSetNumber: 2,
      discontiunityPlaneNumber: 2,
      positionX: 60,
      positionY: 110,
      positionZ: 35,
    },
    {
      siteId: constSiteId,
      vertexId: 3,
      jointSetNumber: 3,
      discontiunityPlaneNumber: 3,
      positionX: 55,
      positionY: 105,
      positionZ: 32,
    },
    {
      siteId: constSiteId,
      vertexId: 4,
      jointSetNumber: 4,
      discontiunityPlaneNumber: 4,
      positionX: 65,
      positionY: 115,
      positionZ: 37,
    },
    {
      siteId: constSiteId,
      vertexId: 5,
      jointSetNumber: 5,
      discontiunityPlaneNumber: 5,
      positionX: 52.5,
      positionY: 102.5,
      positionZ: 31.5,
    },
    {
      siteId: constSiteId,
      vertexId: 6,
      jointSetNumber: 6,
      discontiunityPlaneNumber: 6,
      positionX: 62.5,
      positionY: 112.5,
      positionZ: 36.5,
    },
    {
      siteId: constSiteId,
      vertexId: 7,
      jointSetNumber: 7,
      discontiunityPlaneNumber: 7,
      positionX: 57.5,
      positionY: 107.5,
      positionZ: 33,
    },
    {
      siteId: constSiteId,
      vertexId: 8,
      jointSetNumber: 8,
      discontiunityPlaneNumber: 8,
      positionX: 67.5,
      positionY: 117.5,
      positionZ: 38,
    },
    {
      siteId: constSiteId,
      vertexId: 9,
      jointSetNumber: 9,
      discontiunityPlaneNumber: 9,
      positionX: 60.5,
      positionY: 110.5,
      positionZ: 34,
    },
    {
      siteId: constSiteId,
      vertexId: 10,
      jointSetNumber: 10,
      discontiunityPlaneNumber: 10,
      positionX: 70,
      positionY: 120,
      positionZ: 40,
    },
  ]);
  const lidarPointClouds = await LidarPointCloud.find({ siteId });
  if (lidarPointClouds) return lidarPointClouds;
  throw new Error('Lidar point clouds not found');
};

module.exports = {
  getBySiteId,
};
