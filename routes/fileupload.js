const { Router } = require("express");
const multer = require("multer");
const { handleFileUpload } = require("../controllers/fileupload");

const router = Router();

const fileFilter = (req, file, cb) => {
  // Accept images only
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];
  const isImageExtension = file.originalname.match(/\.(jpg|jpeg|png|webp)$/i);
  if (allowedMimeTypes.includes(file.mimetype) && isImageExtension) {
    return cb(null, true);
  }
  cb(new Error("Only image files (JPEG, PNG, WebP) are allowed!"), false);
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 2, files: 1 }, // 2MB limit
});

router.post("/upload", (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        const errorMessage =
          err.code === "LIMIT_FILE_SIZE"
            ? "File size cannot exceed 2 MB."
            : err.message;
        return res.status(400).json({
          success: false,
          message: errorMessage,
          errors: {
            file: [errorMessage],
          },
        });
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          success: false,
          message: "Unexpected upload field name. Use 'file'.",
          errors: {
            file: ["Unexpected upload field name. Use 'file'."],
          },
        });
      }
    }

    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
        errors: {
          file: [err.message],
        },
      });
    }

    try {
      await handleFileUpload(req, res);
    } catch (error) {
      next(error);
    }
  });
});

module.exports = router;
