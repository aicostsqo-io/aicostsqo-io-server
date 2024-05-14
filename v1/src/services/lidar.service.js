const {
  writeWorkbookToFile,
  readWorkbookFromFile,
} = require('../scripts/utils/excel.helper');
const {
  LIDAR_JOINT_SET_COLUMNS,
  LIDAR_POINT_CLOUD_COLUMNS,
  LIDAR_TRACES_COLUMNS,
} = require('./constants/modelColumns');
const { createWorkBook, addWorksheetToWorkbook } = require('./excel.service');
const {
  getBySiteId: pointCloudsBySiteId,
  insert: insertPointCloud,
} = require('./lidarPointCloud.service');
const {
  getBySiteId: tracesBySiteId,
  insert: insertTrace,
} = require('./lidarTrace.service');
const {
  getBySiteId: jointSetsBySiteId,
  insert: insertJointSet,
} = require('./lidarJointSet.service');

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
  return await writeWorkbookToFile(workbook);
};

const importFromXlsx = async (fileName) => {
  const res = await readWorkbookFromFile(fileName);
  const worksheet = res.getWorksheet('Joint Sets');

  const rows = worksheet.getSheetValues();
  const fields = Object.keys(LIDAR_JOINT_SET_COLUMNS);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (
    fields.some(
      (field, index) => LIDAR_JOINT_SET_COLUMNS[field] !== columns[index]
    )
  ) {
    throw new Error('Invalid column names');
  }
  for (let row = 2; row < rows.length; row++) {
    const element = rows[row];
    const obj = {};
    for (let i = 0; i < fields.length; i++) {
      obj[fields[i]] = element[i + 1];
    }
    await insertJointSet(obj);
  }

  const pointCloudsWorksheet = res.getWorksheet('Point Clouds');
  await importPointCloudFromXlsx(pointCloudsWorksheet);

  const tracesWorksheet = res.getWorksheet('Traces');
  await importTraceFromXlsx(tracesWorksheet);
};

const importPointCloudFromXlsx = async (worksheet) => {
  const rows = worksheet.getSheetValues();
  const fields = Object.keys(LIDAR_POINT_CLOUD_COLUMNS);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (
    fields.some(
      (field, index) => LIDAR_POINT_CLOUD_COLUMNS[field] !== columns[index]
    )
  ) {
    throw new Error('Invalid column names');
  }
  for (let row = 2; row < rows.length; row++) {
    const element = rows[row];
    const obj = {};
    for (let i = 0; i < fields.length; i++) {
      obj[fields[i]] = element[i + 1];
    }
    await insertPointCloud(obj);
  }
};

const importTraceFromXlsx = async (worksheet) => {
  const rows = worksheet.getSheetValues();
  const fields = Object.keys(LIDAR_TRACES_COLUMNS);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (
    fields.some(
      (field, index) => LIDAR_TRACES_COLUMNS[field] !== columns[index]
    )
  ) {
    throw new Error('Invalid column names');
  }
  for (let row = 2; row < rows.length; row++) {
    const element = rows[row];
    const obj = {};
    for (let i = 0; i < fields.length; i++) {
      obj[fields[i]] = element[i + 1];
    }
    await insertTrace(obj);
  }
};

const getExcelTemplate = async () => {
  const workbook = createWorkBook();
  addWorksheetToWorkbook(
    workbook,
    'Point Clouds',
    LIDAR_POINT_CLOUD_COLUMNS,
    []
  );
  addWorksheetToWorkbook(workbook, 'Traces', LIDAR_TRACES_COLUMNS, []);
  addWorksheetToWorkbook(workbook, 'Joint Sets', LIDAR_JOINT_SET_COLUMNS, []);
  const res = await writeWorkbookToFile(workbook);
  return res;
};

module.exports = {
  exportBySiteToExcel,
  getExcelTemplate,
  importFromXlsx,
};
