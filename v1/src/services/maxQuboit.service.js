const { getByRpId: getMaxQsByRpId } = require('./outputMaxQ.service');
const { getByRpId: getVolumesByRpId } = require('./outputVolume.service');
const {
  getByRpId: getMaxQVertexesByRpId,
} = require('./outputMaxQVertex.service');
const {
  OUTPUT_MAXQ_COLUMNS,
  OUTPUT_MAXQ_VERTEX_COLUMNS,
  OUTPUT_VOLUME_COLUMNS,
} = require('./constants/modelColumns');
const { writeWorkbookToFile } = require('../scripts/utils/excel.helper');
const { addWorksheetToWorkbook, createWorkBook } = require('./excel.service');

const exportByRpToExcel = async (rpId) => {
  const outputMaxQs = (await getMaxQsByRpId(rpId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });
  const outputMaxQVertexes = (await getMaxQVertexesByRpId(rpId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });
  const outputVolumes = (await getVolumesByRpId(rpId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });

  if (
    outputMaxQs.length < 1 &&
    outputVolumes.length < 1 &&
    outputMaxQVertexes.length < 1
  ) {
    throw new Error('No data found');
  }

  const workbook = createWorkBook();
  addWorksheetToWorkbook(workbook, 'Max Qs', OUTPUT_MAXQ_COLUMNS, outputMaxQs);
  addWorksheetToWorkbook(
    workbook,
    'Max Q Vertexes',
    OUTPUT_MAXQ_VERTEX_COLUMNS,
    outputMaxQVertexes
  );
  addWorksheetToWorkbook(
    workbook,
    'Volumes',
    OUTPUT_VOLUME_COLUMNS,
    outputVolumes
  );
  return await writeWorkbookToFile(workbook);
};

module.exports = {
  exportByRpToExcel,
};
