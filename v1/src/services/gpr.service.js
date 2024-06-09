const Gpr = require('../models/gpr.model');
const {
  GPR_COLUMNS,
  GPR_PROFILE_COLUMNS,
  GPR_DISC_COLUMNS,
} = require('./constants/modelColumns');
const {
  getBySiteId: getDiscsBySiteId,
  insert: insertDisc,
} = require('./gprDisc.service');
const {
  getBySiteId: getProfilesBySiteId,
  insert: insertProfile,
} = require('./gprProfile.service');
const { createWorkBook, addWorksheetToWorkbook } = require('./excel.service');
const {
  writeWorkbookToFile,
  readWorkbookFromFile,
} = require('../scripts/utils/excel.helper');

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

const importFromXlsx = async (fileName) => {
  const res = await readWorkbookFromFile(fileName);
  const worksheet = res.getWorksheet('GPRs');
  const { _id, ...gprColumns } = GPR_COLUMNS;
  const rows = worksheet.getSheetValues();
  const fields = Object.keys(gprColumns);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (fields.some((field, index) => gprColumns[field] !== columns[index])) {
    throw new Error('Invalid column names');
  }

  for (let row = 2; row < rows.length; row++) {
    const element = rows[row];
    const obj = {};
    for (let i = 0; i < fields.length; i++) {
      obj[fields[i]] = element[i + 1];
    }
    obj.vertex1 = {};
    obj.vertex2 = {};
    obj.vertex1.startOfLongitudinalProfilesX =
      obj.vertex1StartOfLongitudinalProfilesX;
    obj.vertex1.startOfLongitudinalProfilesY =
      obj.vertex1StartOfLongitudinalProfilesY;
    obj.vertex1.startOfLongitudinalProfilesZ =
      obj.vertex1StartOfLongitudinalProfilesZ;
    obj.vertex1.endOfLongitudinalProfilesX =
      obj.vertex1EndOfLongitudinalProfilesX;
    obj.vertex1.endOfLongitudinalProfilesY =
      obj.vertex1EndOfLongitudinalProfilesY;
    obj.vertex1.endOfLongitudinalProfilesZ =
      obj.vertex1EndOfLongitudinalProfilesZ;
    obj.vertex1.startOfTraversalProfilesX =
      obj.vertex1StartOfTraversalProfilesX;
    obj.vertex1.startOfTraversalProfilesY =
      obj.vertex1StartOfTraversalProfilesY;
    obj.vertex1.startOfTraversalProfilesZ =
      obj.vertex1StartOfTraversalProfilesZ;
    obj.vertex1.endOfTraversalProfilesX = obj.vertex1EndOfTraversalProfilesX;
    obj.vertex1.endOfTraversalProfilesY = obj.vertex1EndOfTraversalProfilesY;
    obj.vertex1.endOfTraversalProfilesZ = obj.vertex1EndOfTraversalProfilesZ;
    obj.vertex2.startOfLongitudinalProfilesX =
      obj.vertex2StartOfLongitudinalProfilesX;
    obj.vertex2.startOfLongitudinalProfilesY =
      obj.vertex2StartOfLongitudinalProfilesY;
    obj.vertex2.startOfLongitudinalProfilesZ =
      obj.vertex2StartOfLongitudinalProfilesZ;
    obj.vertex2.endOfLongitudinalProfilesX =
      obj.vertex2EndOfLongitudinalProfilesX;
    obj.vertex2.endOfLongitudinalProfilesY =
      obj.vertex2EndOfLongitudinalProfilesY;
    obj.vertex2.endOfLongitudinalProfilesZ =
      obj.vertex2EndOfLongitudinalProfilesZ;
    obj.vertex2.startOfTraversalProfilesX =
      obj.vertex2StartOfTraversalProfilesX;
    obj.vertex2.startOfTraversalProfilesY =
      obj.vertex2StartOfTraversalProfilesY;
    obj.vertex2.startOfTraversalProfilesZ =
      obj.vertex2StartOfTraversalProfilesZ;
    obj.vertex2.endOfTraversalProfilesX = obj.vertex2EndOfTraversalProfilesX;
    obj.vertex2.endOfTraversalProfilesY = obj.vertex2EndOfTraversalProfilesY;
    obj.vertex2.endOfTraversalProfilesZ = obj.vertex2EndOfTraversalProfilesZ;

    // clear
    delete obj.vertex1StartOfLongitudinalProfilesX;
    delete obj.vertex1StartOfLongitudinalProfilesY;
    delete obj.vertex1StartOfLongitudinalProfilesZ;
    delete obj.vertex1EndOfLongitudinalProfilesX;
    delete obj.vertex1EndOfLongitudinalProfilesY;
    delete obj.vertex1EndOfLongitudinalProfilesZ;
    delete obj.vertex1StartOfTraversalProfilesX;
    delete obj.vertex1StartOfTraversalProfilesY;
    delete obj.vertex1StartOfTraversalProfilesZ;
    delete obj.vertex1EndOfTraversalProfilesX;
    delete obj.vertex1EndOfTraversalProfilesY;
    delete obj.vertex1EndOfTraversalProfilesZ;
    delete obj.vertex2StartOfLongitudinalProfilesX;
    delete obj.vertex2StartOfLongitudinalProfilesY;
    delete obj.vertex2StartOfLongitudinalProfilesZ;
    delete obj.vertex2EndOfLongitudinalProfilesX;
    delete obj.vertex2EndOfLongitudinalProfilesY;
    delete obj.vertex2EndOfLongitudinalProfilesZ;
    delete obj.vertex2StartOfTraversalProfilesX;
    delete obj.vertex2StartOfTraversalProfilesY;
    delete obj.vertex2StartOfTraversalProfilesZ;
    delete obj.vertex2EndOfTraversalProfilesX;
    delete obj.vertex2EndOfTraversalProfilesY;
    delete obj.vertex2EndOfTraversalProfilesZ;

    await insert(obj);
  }

  const discsWorksheet = res.getWorksheet('Discs');
  await importDiscFromXlsx(discsWorksheet);

  const profilesWorksheet = res.getWorksheet('Profiles');
  await importProfileFromXlsx(profilesWorksheet);
};

const importDiscFromXlsx = async (worksheet) => {
  const rows = worksheet.getSheetValues();
  const fields = Object.keys(GPR_DISC_COLUMNS);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (
    fields.some((field, index) => GPR_DISC_COLUMNS[field] !== columns[index])
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

const importProfileFromXlsx = async (worksheet) => {
  const rows = worksheet.getSheetValues();
  const fields = Object.keys(GPR_PROFILE_COLUMNS);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (
    fields.some((field, index) => GPR_PROFILE_COLUMNS[field] !== columns[index])
  ) {
    throw new Error('Invalid column names');
  }

  for (let row = 2; row < rows.length; row++) {
    const element = rows[row];
    const obj = {};
    for (let i = 0; i < fields.length; i++) {
      obj[fields[i]] = element[i + 1];
    }
    await insertProfile(obj);
  }
};

const getExcelTemplate = async () => {
  const workbook = createWorkBook();
  const gprColumns = Object.values(GPR_COLUMNS).filter(
    (column) => column !== 'ID'
  );
  addWorksheetToWorkbook(workbook, 'GPRs', gprColumns, []);
  addWorksheetToWorkbook(workbook, 'Profiles', GPR_PROFILE_COLUMNS, []);
  addWorksheetToWorkbook(workbook, 'Discs', GPR_DISC_COLUMNS, []);
  const res = await writeWorkbookToFile(workbook);
  return res;
};

module.exports = {
  insertGpr: insert,
  getBySiteId,
  bulkDelete,
  exportBySiteToExcel,
  getExcelTemplate,
  importFromXlsx,
};
