const Televiewer = require('../models/televiewer.model');
const {
  getBySiteId: getDiscsBySiteId,
  insert: insertDisc,
} = require('./televiewerDisc.service');
const {
  TELEVIEWER_COLUMNS,
  TELEVIEWER_DISC_COLUMNS,
  JOINT_SET_COLUMNS,
} = require('./constants/modelColumns');
const { createWorkBook, addWorksheetToWorkbook } = require('./excel.service');
const {
  writeWorkbookToFile,
  readWorkbookFromFile,
} = require('../scripts/utils/excel.helper');

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

const importFromXlsx = async (fileName) => {
  const res = await readWorkbookFromFile(fileName);
  const worksheet = res.getWorksheet('Televiewers');

  const rows = worksheet.getSheetValues();
  const fields = Object.keys(TELEVIEWER_COLUMNS);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (
    fields.some((field, index) => TELEVIEWER_COLUMNS[field] !== columns[index])
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

  const discWorksheet = res.getWorksheet('Discs');
  await importDiscsFromXlsx(discWorksheet);
};

const importDiscsFromXlsx = async (worksheet) => {
  const rows = worksheet.getSheetValues();
  const fields = Object.keys(TELEVIEWER_DISC_COLUMNS);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (
    fields.some(
      (field, index) => TELEVIEWER_DISC_COLUMNS[field] !== columns[index]
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
    await insertDisc(obj);
  }
};

const getExcelTemplate = async () => {
  const workbook = createWorkBook();
  addWorksheetToWorkbook(workbook, 'Televiewers', TELEVIEWER_COLUMNS, []);
  addWorksheetToWorkbook(workbook, 'Discs', TELEVIEWER_DISC_COLUMNS, []);
  const res = await writeWorkbookToFile(workbook);
  return res;
};

module.exports = {
  insertTeleviewer: insert,
  getBySiteId,
  exportBySiteToExcel,
  importFromXlsx,
  getExcelTemplate,
};
