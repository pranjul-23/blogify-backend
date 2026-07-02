const File = require("../models/fileupload");
const { uploadToS3 } = require("../services/uploadService");

async function handleFileUpload(req, res) {
  try {
    const { folder } = req.body;

    const allowedFolders = ["blogs", "profiles"];
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    if (!allowedFolders.includes(folder)) {
      return res.status(400).json({
        success: false,
        message: "Invalid upload folder.",
      });
    }
    const imageUrl = await uploadToS3(folder, req.file);

    const file = await File.create({
      filename: req.file.originalname,
      filepath: imageUrl,
    });
    return res.status(201).json({ success: true, data: file });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong.",
    });
  }
}

module.exports = {
  handleFileUpload,
};
