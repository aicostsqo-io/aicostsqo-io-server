const fs = require('fs').promises;
const uuid = require('uuid');
const path = require('path');

const uploadFile = (img, folderToSave) => {
  return new Promise(async (resolve, reject) => {
    const fileExtension = path.extname(img.name);
    const fileName = `${uuid.v4().replace(/-/g, '')}${fileExtension}`;
    const folderPath = path.join(
      __dirname,
      '../',
      '../',
      'uploads',
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

    img.mv(filePath, (err) => {
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
