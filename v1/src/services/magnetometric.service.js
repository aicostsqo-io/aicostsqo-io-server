const Magnetometric = require('../models/magnetometric.model');
const {
  writeWorkbookToFile,
  readWorkbookFromFile,
} = require('../scripts/utils/excel.helper');
const {
  MAGNETOMETRICS_COLUMNS,
  MAGNETOMETRICS_DISC_COLUMNS,
} = require('./constants/modelColumns');
const { createWorkBook, addWorksheetToWorkbook } = require('./excel.service');
const {
  getBySiteId: getDiscsBySiteId,
  insertMagnetometricDiscs,
} = require('./magnetometricDisc.service');

const insert = async (magnetometricData) => {
  const magnetometric = await Magnetometric.create(magnetometricData);
  if (magnetometric) return magnetometric;
  throw new Error('Magnetometric not created');
};

const getBySiteId = async (siteId) => {
  const magnetometrics = await Magnetometric.find({ siteId });
  if (magnetometrics) return magnetometrics;
  throw new Error('Magnetometrics not found');
};

const exportBySiteToExcel = async (siteId) => {
  const magnetometrics = (await getBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });
  const magnetometricDiscs = (await getDiscsBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });

  if (magnetometrics.length < 1 && magnetometricDiscs.length < 1) {
    throw new Error('No magnetometrics and magnetometric discs found');
  }

  const workbook = createWorkBook();
  addWorksheetToWorkbook(
    workbook,
    'Magnetometrics',
    MAGNETOMETRICS_COLUMNS,
    magnetometrics
  );
  addWorksheetToWorkbook(
    workbook,
    'Discs',
    MAGNETOMETRICS_DISC_COLUMNS,
    magnetometricDiscs
  );
  return await writeWorkbookToFile(workbook);
};

const importFromXlsx = async (fileName) => {
  const res = await readWorkbookFromFile(fileName);
  const worksheet = res.getWorksheet('Magnetometrics');
  const { _id, ...magnetometricColumns } = MAGNETOMETRICS_COLUMNS;
  const rows = worksheet.getSheetValues();
  const fields = Object.keys(magnetometricColumns);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (
    fields.some(
      (field, index) => magnetometricColumns[field] !== columns[index]
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
    await insert(obj);
  }

  const discsWorksheet = res.getWorksheet('Discs');
  await importDiscFromXlsx(discsWorksheet);
};

const importDiscFromXlsx = async (worksheet) => {
  const rows = worksheet.getSheetValues();
  const { _id, ...magnetometricDiscColumns } = MAGNETOMETRICS_DISC_COLUMNS;
  const fields = Object.keys(magnetometricDiscColumns);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (
    fields.some(
      (field, index) => magnetometricDiscColumns[field] !== columns[index]
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
    await insertMagnetometricDiscs(obj);
  }
};

const getExcelTemplate = async () => {
  const workbook = createWorkBook();
  const magnetometricColumns = Object.values(MAGNETOMETRICS_COLUMNS).filter(
    (column) => column !== 'ID'
  );
  const magnetometricDiscColumns = Object.values(
    MAGNETOMETRICS_DISC_COLUMNS
  ).filter((column) => column !== 'ID');
  addWorksheetToWorkbook(workbook, 'Magnetometrics', magnetometricColumns, []);
  addWorksheetToWorkbook(workbook, 'Discs', magnetometricDiscColumns, []);
  return await writeWorkbookToFile(workbook);
};

module.exports = {
  insertMagnetometric: insert,
  getBySiteId,
  exportBySiteToExcel,
  getExcelTemplate,
  importFromXlsx,
};
