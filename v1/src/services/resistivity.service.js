const Resistivity = require('../models/resistivity.model');
const { writeWorkbookToFile } = require('../scripts/utils/excel.helper');
const { addWorksheetToWorkbook, createWorkBook } = require('./excel.service');
const {
  getBySiteId: getContoursBySiteId,
} = require('./resistivityContour.service');

const insert = async (resistivityData) => {
  const resistivity = await Resistivity.create(resistivityData);
  if (resistivity) return resistivity;
  throw new Error('Resistivity not created');
};

const getBySiteId = async (siteId) => {
  const resistivitys = await Resistivity.find({ siteId });
  if (resistivitys) return resistivitys;
  throw new Error('Resistivitys not found');
};

const exportBySiteToExcel = async (siteId) => {
  const resistivities = (await getBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });
  const resistivitiyContours = (await getContoursBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });

  if (resistivities.length < 1 && resistivitiyContours.length < 1) {
    throw new Error('No resistivities and resistivitiy contours found');
  }

  const workbook = createWorkBook();
  addWorksheetToWorkbook(
    workbook,
    'Resistivities',
    RESISTIVITY_COLUMNS,
    resistivities
  );
  addWorksheetToWorkbook(
    workbook,
    'Contours',
    RESISTIVITY_CONTOUR_COLUMNS,
    resistivitiyContours
  );
  return writeWorkbookToFile(workbook);
};

module.exports = {
  insertResistivity: insert,
  getBySiteId,
  exportBySiteToExcel,
};
