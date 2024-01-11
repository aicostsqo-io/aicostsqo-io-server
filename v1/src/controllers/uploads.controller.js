const { upload: uploadFile } = require('../services/upload.service');

const upload = async (req, res) => {
  if (!req.files.image) throw new Error('No file uploaded');
  const uploadedFileName = await uploadFile(
    req.files.file,
    req.body.folder ?? ''
  );
  res.send({
    filePath: uploadedFileName,
    success: true,
    message: 'File uploaded successfully',
  });
};

module.exports = {
  upload,
};
