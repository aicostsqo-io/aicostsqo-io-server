const {
  fileNameGenerator,
  folderPaths,
  pathCombiner,
} = require('./uploadsFolderOrganizer');

const writeWorkbookToFile = async (workbook) => {
  const fileName = fileNameGenerator('.xlsx');
  const pathToSave = folderPaths.excelOutputs.absolutePath;
  await workbook.xlsx.writeFile(pathCombiner(pathToSave, fileName));
  return `${folderPaths.excelOutputs.path.replace('\\', '/')}/${fileName}`;
};

const createWorksheetHeaders = (worksheet, columns) => {
  const sheetColumns = [];
  Object.entries(columns).forEach(([key, value]) => {
    sheetColumns.push({
      header: value,
      key,
      width: value.length < 12 ? 12 : value.length,
    });
  });
  worksheet.columns = sheetColumns;
  worksheet.getRow(1).font = { bold: true };
};

module.exports = {
  writeWorkbookToFile,
  createWorksheetHeaders,
};
