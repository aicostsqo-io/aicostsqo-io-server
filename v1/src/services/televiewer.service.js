const Televiewer = require('../models/televiewer.model');
const { getBySiteId: getDiscsBySiteId } = require('./televiewerDisc.service');
const {
  TELEVIEWER_COLUMNS,
  TELEVIEWER_DISC_COLUMNS,
} = require('./constants/modelColumns');
const { createWorkBook, addWorksheetToWorkbook } = require('./excel.service');
const { writeWorkbookToFile } = require('../scripts/utils/excel.helper');

const insert = async (televiewerData) => {
  const televiewer = await Televiewer.create(televiewerData);
  if (televiewer) return televiewer;
  throw new Error('Televiewer not created');
};

const getBySiteId = async (siteId) => {
  const televiewers = await Televiewer.find({ siteId });
  if (televiewers) return televiewers;
  throw new Error('Televiewers not found');
};

const exportBySiteToExcel = async (siteId) => {
  const televiewers = (await getBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });
  const televiewerDiscs = (await getDiscsBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });

  if (televiewers.length < 1 && televiewerDiscs.length < 1) {
    throw new Error('No televiewers and televiewer discs found');
  }

  const workbook = createWorkBook();
  addWorksheetToWorkbook(
    workbook,
    'Televiewers',
    TELEVIEWER_COLUMNS,
    televiewers
  );
  addWorksheetToWorkbook(
    workbook,
    'Discs',
    TELEVIEWER_DISC_COLUMNS,
    televiewerDiscs
  );
  return await writeWorkbookToFile(workbook);
};

module.exports = {
  insertTeleviewer: insert,
  getBySiteId,
  exportBySiteToExcel,
};
