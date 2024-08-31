const Rp = require('../models/rp.model');
const { createOutputVolumes } = require('./distributionCurves.service');
const { getByRp } = require('./outputVolume.service');
const {
  writeWorkbookToFile,
  readWorkbookFromFile,
} = require('../scripts/utils/excel.helper');
const { addWorksheetToWorkbook, createWorkBook } = require('./excel.service');
const { RP_COLUMNS, RP_DISC_COLUMNS } = require('./constants/modelColumns');
const { getDiscsByRpId, insertDisc } = require('./rpDisc.service');

const list = async () => {
  const rps = await Rp.find({});
  if (rps) return rps;
  throw new Error('Rps not found');
};

const get = async (rpId) => {
  const rp = await Rp.findById(rpId);
  if (rp) return rp;
  throw new Error('Rp not found');
};

const bulkDeleteRps = async (rps) => {
  const result = await Rp.deleteMany({ _id: { $in: rps } });
  console.log('silme sonucu: ', result);
};

const bulkInsertRps = async (rps) => {
  await Rp.insertMany(rps);
};

const insert = async (rpData) => {
  const rp = await Rp.create(rpData);
  if (rp) return rp;
  throw new Error('Rp not created');
};

const update = async (rpId, rpData) => {
  const rp = await Rp.findByIdAndUpdate(rpId, rpData, { new: true });
  if (rp) return rp;
  throw new Error('Rp not updated');
};

const getRpsBySiteBoundId = async (siteBoundId) => {
  const rps = await Rp.find({ siteBound: siteBoundId });

  if (!rps) {
    throw new Error('Rps not found');
  }

  rps.sort((a, b) => {
    const numA = parseInt(a.name.replace(/\D/g, ''), 10);
    const numB = parseInt(b.name.replace(/\D/g, ''), 10);
    return numA - numB;
  });

  return rps;
};

const getRpById = async (id) => {
  const rp = await Rp.findById(id);

  if (!rp) {
    throw new Error('rp not found');
  }

  return rp;
};

const getLastRpBySiteBoundId = async (siteBoundId) => {
  const rp = await Rp.findOne({
    siteBound: siteBoundId,
  })
    .sort({ name: -1 })
    .limit(1);
  if (rp) return rp;
  throw new Error('Rps not found');
};

const getOutputVolumesByRp = async (rpId) => {
  const outputVolumes = await getByRp(rpId);
  if (outputVolumes.length < 1) {
    return await createOutputVolumes(rpId);
  }
  return outputVolumes;
};

const exportBySiteBoundToExcel = async (siteBoundId) => {
  const rps = (await getRpsBySiteBoundId(siteBoundId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
      siteBound: p.siteBound.toString(),
    };
  });
  const rpDiscs = await rps.reduce(async (accPromise, curr) => {
    const acc = await accPromise;
    const discs = await getDiscsByRpId(curr._id);
    acc.push(...discs);
    return acc;
  }, []);

  if (rps.length < 1 && rpDiscs.length < 1) {
    throw new Error('No rps and rp discs found');
  }

  const workbook = createWorkBook();
  addWorksheetToWorkbook(workbook, 'RPs', RP_COLUMNS, rps);
  addWorksheetToWorkbook(workbook, 'Discs', RP_DISC_COLUMNS, rpDiscs);
  return await writeWorkbookToFile(workbook);
};

const importFromXlsx = async (fileName) => {
  const res = await readWorkbookFromFile(fileName);
  const worksheet = res.getWorksheet('RPs');
  const { _id, ...rpColumns } = RP_COLUMNS;
  const rows = worksheet.getSheetValues();
  const fields = Object.keys(rpColumns);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (fields.some((field, index) => rpColumns[field] !== columns[index])) {
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
  const { _id, ...rpDiscColumns } = RP_DISC_COLUMNS;
  const fields = Object.keys(rpDiscColumns);
  const columns = rows[1].filter((column) => column);
  if (fields.length !== columns.length) {
    throw new Error('Invalid column count');
  }

  if (fields.some((field, index) => rpDiscColumns[field] !== columns[index])) {
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
  const rpColumns = Object.values(RP_COLUMNS).filter(
    (column) => column !== 'ID'
  );
  const rpDiscColumns = Object.values(RP_DISC_COLUMNS).filter(
    (column) => column !== 'ID'
  );
  addWorksheetToWorkbook(workbook, 'RPs', rpColumns, []);
  addWorksheetToWorkbook(workbook, 'Discs', rpDiscColumns, []);
  return await writeWorkbookToFile(workbook);
};

module.exports = {
  bulkDeleteRps,
  listRps: list,
  insertRp: insert,
  updateRp: update,
  getRp: get,
  getRpsBySiteBoundId,
  bulkInsertRps,
  getLastRpBySiteBoundId,
  getOutputVolumesByRp,
  exportBySiteBoundToExcel,
  getExcelTemplate,
  importFromXlsx,
  getRpById,
};
