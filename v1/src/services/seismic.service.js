const Seismic = require('../models/seismic.model');
const { getBySiteId: getDiscsBySiteId } = require('./seismicDisc.service');
const {
  SEISMIC_COLUMNS,
  SEISMIC_PROFILE_COLUMNS,
  SEISMIC_DISC_COLUMNS,
} = require('./constants/modelColumns');
const {
  getBySiteId: getProfilesBySiteId,
} = require('./seismicProfile.service');
const { createWorkBook, addWorksheetToWorkbook } = require('./excel.service');
const { writeWorkbookToFile } = require('../scripts/utils/excel.helper');

const insert = async (seismicData) => {
  const seismic = await Seismic.create(seismicData);
  if (seismic) return seismic;
  throw new Error('Seismic not created');
};

const getBySiteId = async (siteId) => {
  const seismics = await Seismic.find({ siteId });
  if (seismics) return seismics;
  throw new Error('Seismics not found');
};

const exportBySiteToExcel = async (siteId) => {
  const seismics = (await getBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });
  const seismicProfiles = (await getProfilesBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });
  const seismicDiscs = (await getDiscsBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });

  if (
    seismics.length < 1 &&
    seismicProfiles.length < 1 &&
    seismicDiscs.length < 1
  ) {
    throw new Error('No seismics, profiles and discs found');
  }

  const workbook = createWorkBook();
  addWorksheetToWorkbook(workbook, 'Seismics', SEISMIC_COLUMNS, seismics);
  addWorksheetToWorkbook(
    workbook,
    'Profiles',
    SEISMIC_PROFILE_COLUMNS,
    seismicProfiles
  );
  addWorksheetToWorkbook(workbook, 'Discs', SEISMIC_DISC_COLUMNS, seismicDiscs);
  return writeWorkbookToFile(workbook);
};

module.exports = {
  insertSeismic: insert,
  getBySiteId,
  exportBySiteToExcel,
};
