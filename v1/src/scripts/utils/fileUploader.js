const uuid = require('uuid');
const path = require('path');

const uploadFile = (img, folderToSave) => {
  return new Promise((resolve, reject) => {
    const fileExtension = path.extname(img.name);
    const fileName = `${uuid.v4().replace(/-/g, '')}${fileExtension}`;
    const folderPath = path.join(
      __dirname,
      '../',
      '../',
      `uploads/${folderToSave}`,
      fileName
    );
    img.mv(folderPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`${folderToSave}/${fileName}`);
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
