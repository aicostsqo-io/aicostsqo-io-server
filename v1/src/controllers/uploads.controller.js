const { upload: uploadFile } = require('../services/upload.service');

const upload = async (req, res) => {
  if (!req.files.image || !req.body.folder) throw new Error('No file uploaded');
  const uploadedFileName = await uploadFile(req.files.image, req.body.folder);
  res.send({
    filePath: uploadedFileName,
    success: true,
    message: 'File uploaded successfully',
  });
};

module.exports = {
  upload,
};
