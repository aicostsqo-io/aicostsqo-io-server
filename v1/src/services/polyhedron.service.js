const {
  getByRpId: getPolyhedronsByRpId,
} = require('./outputPolyhedron.service');
const { getByRpId: getFacesByRpId } = require('./outputFace.service');
const { getByRpId: getVertexesByRpId } = require('./outputVertex.service');
const {
  OUTPUT_POLYHEDRON_COLUMNS,
  OUTPUT_VERTEX_COLUMNS,
  OUTPUT_FACE_COLUMNS,
} = require('./constants/modelColumns');
const { writeWorkbookToFile } = require('../scripts/utils/excel.helper');
const { addWorksheetToWorkbook, createWorkBook } = require('./excel.service');

const exportByRpToExcel = async (rpId) => {
  const outputPolyhedrons = (await getPolyhedronsByRpId(rpId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });
  const outputFaces = (await getFacesByRpId(rpId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
      vertexes: p._doc.vertexes.join(', ') || '',
    };
  });
  const outputVertexes = (await getVertexesByRpId(rpId)).map((p) => {
    return {
      ...p._doc,
      _id: p._id.toString(),
    };
  });

  if (
    outputPolyhedrons.length < 1 &&
    outputFaces.length < 1 &&
    outputVertexes.length < 1
  ) {
    throw new Error('No data found');
  }

  const workbook = createWorkBook();
  addWorksheetToWorkbook(
    workbook,
    'Polyhedrons',
    OUTPUT_POLYHEDRON_COLUMNS,
    outputPolyhedrons
  );
  addWorksheetToWorkbook(workbook, 'Faces', OUTPUT_FACE_COLUMNS, outputFaces);
  addWorksheetToWorkbook(
    workbook,
    'Vertexes',
    OUTPUT_VERTEX_COLUMNS,
    outputVertexes
  );
  return writeWorkbookToFile(workbook);
};

module.exports = {
  exportByRpToExcel,
};
