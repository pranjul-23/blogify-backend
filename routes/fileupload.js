const { Router } = require("express");
const multer = require("multer");
const { handleFileUpload } = require("../controllers/fileupload");

const router = Router();

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 }, // 1MB limit
});

router.post("/upload", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          errors: {
            file: ["File size cannot exceed 1 MB"],
          },
        });
      }
    }

    if (err) {
      return res.status(400).json({
        success: false,
        errors: {
          file: [err.message],
        },
      });
    }

    handleFileUpload(req, res);
  });
});

module.exports = router;
