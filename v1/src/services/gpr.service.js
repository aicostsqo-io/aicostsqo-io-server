const Gpr = require('../models/gpr.model');
const {
  GPR_COLUMNS,
  GPR_PROFILE_COLUMNS,
  GPR_DISC_COLUMNS,
} = require('./constants/modelColumns');
const { getBySiteId: getDiscsBySiteId } = require('./gprDisc.service');
const { getBySiteId: getProfilesBySiteId } = require('./gprProfile.service');
const { createWorkBook, addWorksheetToWorkbook } = require('./excel.service');
const { writeWorkbookToFile } = require('../scripts/utils/excel.helper');

const insert = async (gprData) => {
  const gpr = await Gpr.create(gprData);
  if (gpr) return gpr;
  throw new Error('Gpr not created');
};

const getBySiteId = async (siteId) => {
  const gprs = await Gpr.find({ siteId });
  if (gprs) return gprs;
  throw new Error('Gprs not found');
};

const bulkDelete = async (gprs) => {
  await Gpr.deleteMany({ _id: { $in: gprs } });
};

const exportBySiteToExcel = async (siteId) => {
  const gprs = (await getBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
      vertex1StartOfLongitudinalProfilesX:
        p.vertex1.startOfLongitudinalProfilesX,
      vertex1StartOfLongitudinalProfilesY:
        p.vertex1.startOfLongitudinalProfilesY,
      vertex1StartOfLongitudinalProfilesZ:
        p.vertex1.startOfLongitudinalProfilesZ,
      vertex1EndOfLongitudinalProfilesX: p.vertex1.endOfLongitudinalProfilesX,
      vertex1EndOfLongitudinalProfilesY: p.vertex1.endOfLongitudinalProfilesY,
      vertex1EndOfLongitudinalProfilesZ: p.vertex1.endOfLongitudinalProfilesZ,
      vertex1StartOfTraversalProfilesX: p.vertex1.startOfTraversalProfilesX,
      vertex1StartOfTraversalProfilesY: p.vertex1.startOfTraversalProfilesY,
      vertex1StartOfTraversalProfilesZ: p.vertex1.startOfTraversalProfilesZ,
      vertex1EndOfTraversalProfilesX: p.vertex1.endOfTraversalProfilesX,
      vertex1EndOfTraversalProfilesY: p.vertex1.endOfTraversalProfilesY,
      vertex1EndOfTraversalProfilesZ: p.vertex1.endOfTraversalProfilesZ,
      vertex2StartOfLongitudinalProfilesX:
        p.vertex2.startOfLongitudinalProfilesX,
      vertex2StartOfLongitudinalProfilesY:
        p.vertex2.startOfLongitudinalProfilesY,
      vertex2StartOfLongitudinalProfilesZ:
        p.vertex2.startOfLongitudinalProfilesZ,
      vertex2EndOfLongitudinalProfilesX: p.vertex2.endOfLongitudinalProfilesX,
      vertex2EndOfLongitudinalProfilesY: p.vertex2.endOfLongitudinalProfilesY,
      vertex2EndOfLongitudinalProfilesZ: p.vertex2.endOfLongitudinalProfilesZ,
      vertex2StartOfTraversalProfilesX: p.vertex2.startOfTraversalProfilesX,
      vertex2StartOfTraversalProfilesY: p.vertex2.startOfTraversalProfilesY,
      vertex2StartOfTraversalProfilesZ: p.vertex2.startOfTraversalProfilesZ,
      vertex2EndOfTraversalProfilesX: p.vertex2.endOfTraversalProfilesX,
      vertex2EndOfTraversalProfilesY: p.vertex2.endOfTraversalProfilesY,
      vertex2EndOfTraversalProfilesZ: p.vertex2.endOfTraversalProfilesZ,
    };
  });
  const gprProfiles = (await getProfilesBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });
  const gprDiscs = (await getDiscsBySiteId(siteId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });

  if (gprs.length < 1 && gprProfiles.length < 1 && gprDiscs.length < 1) {
    throw new Error('No gprs, profiles and discs found');
  }

  const workbook = createWorkBook();
  addWorksheetToWorkbook(workbook, 'GPRs', GPR_COLUMNS, gprs);
  addWorksheetToWorkbook(
    workbook,
    'Profiles',
    GPR_PROFILE_COLUMNS,
    gprProfiles
  );
  addWorksheetToWorkbook(workbook, 'Discs', GPR_DISC_COLUMNS, gprDiscs);
  return await writeWorkbookToFile(workbook);
};

module.exports = {
  insertGpr: insert,
  getBySiteId,
  bulkDelete,
  exportBySiteToExcel,
};
