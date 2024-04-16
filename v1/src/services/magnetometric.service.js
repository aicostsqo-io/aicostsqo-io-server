const Magnetometric = require('../models/magnetometric.model');
const { writeWorkbookToFile } = require('../scripts/utils/excel.helper');
const {
  MAGNETOMETRICS_COLUMNS,
  MAGNETOMETRICS_DISC_COLUMNS,
} = require('./constants/modelColumns');
const { createWorkBook, addWorksheetToWorkbook } = require('./excel.service');
const {
  getBySiteId: getDiscsBySiteId,
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
  return writeWorkbookToFile(workbook);
};

module.exports = {
  insertMagnetometric: insert,
  getBySiteId,
  exportBySiteToExcel,
};
