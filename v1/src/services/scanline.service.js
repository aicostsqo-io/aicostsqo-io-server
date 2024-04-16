const Scanline = require('../models/scanline.model');
const { writeWorkbookToFile } = require('../scripts/utils/excel.helper');
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
  return writeWorkbookToFile(workbook);
};

module.exports = {
  insertScanline: insert,
  getBySiteId,
  exportBySiteToExcel,
};
