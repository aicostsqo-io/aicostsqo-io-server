const { writeWorkbookToFile } = require('../scripts/utils/excel.helper');
const {
  LIDAR_JOINT_SET_COLUMNS,
  LIDAR_POINT_CLOUD_COLUMNS,
  LIDAR_TRACES_COLUMNS,
} = require('./constants/modelColumns');
const { createWorkBook, addWorksheetToWorkbook } = require('./excel.service');
const {
  getBySiteId: pointCloudsBySiteId,
} = require('./lidarPointCloud.service');
const { getBySiteId: tracesBySiteId } = require('./lidarTrace.service');
const { getBySiteId: jointSetsBySiteId } = require('./lidarJointSet.service');

const exportBySiteToExcel = async (siteId) => {
  const pointClouds = (await pointCloudsBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });
  const traces = (await tracesBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });
  const jointSets = (await jointSetsBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });

  if (pointClouds.length < 1 && traces.length < 1 && jointSets.length < 1) {
    throw new Error('No lidars found');
  }

  const workbook = createWorkBook();
  addWorksheetToWorkbook(
    workbook,
    'Point Clouds',
    LIDAR_POINT_CLOUD_COLUMNS,
    pointClouds
  );
  addWorksheetToWorkbook(workbook, 'Traces', LIDAR_TRACES_COLUMNS, traces);
  addWorksheetToWorkbook(
    workbook,
    'Joint Sets',
    LIDAR_JOINT_SET_COLUMNS,
    jointSets
  );
  return writeWorkbookToFile(workbook);
};

module.exports = {
  exportBySiteToExcel,
};
