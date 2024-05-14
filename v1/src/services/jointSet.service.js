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

module.exports = {
  insertJointSet: insert,
  getBySiteId,
  exportBySiteToExcel,
};
