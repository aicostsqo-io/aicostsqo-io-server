const fs = require('fs').promises;
const uuid = require('uuid');
const path = require('path');
require('dotenv').config();

const uploadFile = (file, folderToSave, extensionRules = null) => {
  return new Promise(async (resolve, reject) => {
    const fileExtension = path.extname(file.name);
    if (extensionRules && !extensionRules.includes(fileExtension)) {
      reject(new Error('Invalid file extension'));
      return;
    }
    const fileName = `${uuid.v4().replace(/-/g, '')}${fileExtension}`;
    const folderPath = path.join(
      __dirname,
      '../',
      '../',
      process.env.FILE_UPLOAD_PATH ||
        '../../../../../../aicostsqo-static/uploads',
      folderToSave
    );

    try {
      await fs.mkdir(folderPath, { recursive: true });
    } catch (mkdirErr) {
      if (mkdirErr.code !== 'EEXIST') {
        reject(mkdirErr);
        return;
      }
    }

    const filePath = path.join(folderPath, fileName);

    file.mv(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          `${folderToSave ? `${folderToSave}/${fileName}` : `${fileName}`}`
        );
      }
    });
  });
};

module.exports = { uploadFile };

// example usage:
// const uploadedFilePath = await uploadFile(
//   req.files.image,
//   'seismicProfile'
// );
