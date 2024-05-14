const Scanline = require('../models/scanline.model');
const {
  writeWorkbookToFile,
  readWorkbookFromFile,
} = require('../scripts/utils/excel.helper');
const { SCANLINE_COLUMNS } = require('./constants/modelColumns');
const { createWorkBook, addWorksheetToWorkbook } = require('./excel.service');

const insert = async (scanlineData) => {
  const scanline = await Scanline.create(scanlineData);
  if (scanline) return scanline;
  throw new Error('Scanline not created');
};

const getBySiteId = async (siteId) => {
  const scanlines = await Scanline.find({ siteId });
  if (scanlines) return scanlines;
  throw new Error('Scanlines not found');
};

const exportBySiteToExcel = async (siteId) => {
  const scanlines = (await getBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });

  if (scanlines.length < 1) {
    throw new Error('No scanlines found');
  }

  const workbook = createWorkBook();
  addWorksheetToWorkbook(workbook, 'Scanlines', SCANLINE_COLUMNS, scanlines);
  return await writeWorkbookToFile(workbook);
};

const importFromXlsx = async (fileName) => {
  const res = await readWorkbookFromFile(fileName);
  const worksheet = res.getWorksheet('Scanlines');
  const rows = worksheet.getSheetValues();
  if (rows.length < 3) {
    throw new Error('No scanlines found');
  }
  const fields = Object.keys(SCANLINE_COLUMNS);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (
    fields.some((field, index) => SCANLINE_COLUMNS[field] !== columns[index])
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
  addWorksheetToWorkbook(workbook, 'Scanlines', SCANLINE_COLUMNS, []);
  const res = await writeWorkbookToFile(workbook);
  return res;
};

module.exports = {
  insertScanline: insert,
  getBySiteId,
  exportBySiteToExcel,
  importFromXlsx,
  getExcelTemplate,
};
