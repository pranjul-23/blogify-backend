const File = require("../models/fileupload");
const { uploadToS3 } = require("../services/uploadService");

async function handleFileUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const imageUrl = await uploadToS3(req.file);

    const file = await File.create({
      filename: req.file.originalname,
      filepath: imageUrl,
    });
    return res.status(201).json({ sucess: true, data: file });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error?.message });
  }
}

module.exports = {
  handleFileUpload,
};
