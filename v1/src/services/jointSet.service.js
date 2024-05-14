const JointSet = require('../models/joinSet.model');
const { writeWorkbookToFile } = require('../scripts/utils/excel.helper');
const { JOINT_SET_COLUMNS } = require('./constants/modelColumns');
const { createWorkBook, addWorksheetToWorkbook } = require('./excel.service');

const insert = async (jointSetData) => {
  const jointSet = await JointSet.create(jointSetData);
  if (jointSet) return jointSet;
  throw new Error('JointSet not created');
};

const getBySiteId = async (siteId) => {
  const jointSets = await JointSet.find({ siteId });
  if (jointSets) return jointSets;
  throw new Error('Joint sets not found');
};

const exportBySiteToExcel = async (siteId) => {
  const jointSets = (await getBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });

  if (jointSets.length < 1) {
    throw new Error('No jointSets found');
  }

  const workbook = createWorkBook();
  addWorksheetToWorkbook(workbook, 'JointSets', JOINT_SET_COLUMNS, jointSets);
  return await writeWorkbookToFile(workbook);
};

const importFromXlsx = async (fileName) => {
  const res = await readWorkbookFromFile(fileName);
  const worksheet = res.getWorksheet('JointSets');
  const rows = worksheet.getSheetValues();
  if (rows.length < 3) {
    throw new Error('No JointSets found');
  }
  const fields = Object.keys(JOINT_SET_COLUMNS);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (
    fields.some((field, index) => JOINT_SET_COLUMNS[field] !== columns[index])
  ) {
    throw new Error('Invalid column names');
  }
  for (let row = 2; row < rows.length; row++) {
    const element = rows[row];
    const obj = {};
    for (let i = 0; i < fields.length; i++) {
      obj[fields[i]] = element[i + 1];
    }
    await insert(obj);
  }
};

const getExcelTemplate = async () => {
  const workbook = createWorkBook();
  addWorksheetToWorkbook(workbook, 'JointSets', JOINT_SET_COLUMNS, []);
  const res = await writeWorkbookToFile(workbook);
  return res;
};

module.exports = {
  insertJointSet: insert,
  getBySiteId,
  exportBySiteToExcel,
  importFromXlsx,
  getExcelTemplate,
};
