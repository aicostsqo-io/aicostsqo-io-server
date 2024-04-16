const path = require('path');
const uuid = require('uuid');
const fs = require('node:fs');

const FOLDERS = {
  excelOutputs: 'excel-outputs',
  gprProfiles: 'gpr-profiles',
  gprs: 'gprs',
  magnetometrics: 'magnetometrics',
  resistivities: 'resistivities',
  resistivityContours: 'resistivity-contours',
  seismicProfiles: 'seismic-profiles',
};

const fileNameGenerator = (fileExtension) =>
  `${uuid.v4().replace(/-/g, '')}${fileExtension}`;

const pathCombiner = (...fileNames) => path.join(...fileNames);

const createFolders = async () => {
  const folders = Object.keys(FOLDERS);
  for (let index = 0; index < folders.length; index++) {
    const folderToCreate = folderPaths[folders[index]].absolutePath;

    try {
      if (!fs.existsSync(folderToCreate)) {
        fs.mkdirSync(folderToCreate);
      }
    } catch (err) {
      console.error(err);
    }
  }
};

const getFolderAbsolutePath = (folderName) =>
  pathCombiner(__dirname, '../', '../', 'uploads', folderName);

const getFolderPath = (folderName) => pathCombiner('uploads', folderName);

const folderPaths = {
  excelOutputs: {
    path: getFolderPath(FOLDERS.excelOutputs),
    absolutePath: getFolderAbsolutePath(FOLDERS.excelOutputs),
  },
  gprProfiles: {
    path: getFolderPath(FOLDERS.gprProfiles),
    absolutePath: getFolderAbsolutePath(FOLDERS.gprProfiles),
  },
  gprs: {
    path: getFolderPath(FOLDERS.gprs),
    absolutePath: getFolderAbsolutePath(FOLDERS.gprs),
  },
  magnetometrics: {
    path: getFolderPath(FOLDERS.magnetometrics),
    absolutePath: getFolderAbsolutePath(FOLDERS.magnetometrics),
  },
  resistivities: {
    path: getFolderPath(FOLDERS.resistivities),
    absolutePath: getFolderAbsolutePath(FOLDERS.resistivities),
  },
  resistivityContours: {
    path: getFolderPath(FOLDERS.resistivityContours),
    absolutePath: getFolderAbsolutePath(FOLDERS.resistivityContours),
  },
  seismicProfiles: {
    path: getFolderPath(FOLDERS.seismicProfiles),
    absolutePath: getFolderAbsolutePath(FOLDERS.seismicProfiles),
  },
};

module.exports = {
  fileNameGenerator,
  pathCombiner,
  createFolders,
  folderPaths,
  FOLDER_NAMES: FOLDERS,
};
