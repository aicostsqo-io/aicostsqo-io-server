const User = require('../models/user.model');
const { uploadFile } = require('../scripts/utils/fileUploader');

const upload = async (image, folder) => {
  const uploadedFilePath = await uploadFile(image, folder);

  if (!uploadedFilePath) {
    throw new Error('Error while uploading file');
  }
  return uploadedFilePath;
};

module.exports = {
  upload,
};
