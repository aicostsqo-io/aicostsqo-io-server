const { Workbook } = require('exceljs');
const { createWorksheetHeaders } = require('../scripts/utils/excel.helper');

const createWorkBook = () => {
  const workbook = new Workbook();
  workbook.creator = 'AI-COSTSQO';
  workbook.lastModifiedBy = 'AI-COSTSQO';
  workbook.created = new Date(2021, 8, 30);
  workbook.modified = new Date(2021, 8, 30);
  return workbook;
};

const addWorksheetToWorkbook = (workbook, worksheetName, columns, data) => {
  const worksheet = workbook.addWorksheet(worksheetName);
  createWorksheetHeaders(worksheet, columns);
  worksheet.addRows(data);
};

module.exports = {
  addWorksheetToWorkbook,
  createWorkBook,
};
