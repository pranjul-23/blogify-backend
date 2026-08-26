require("dotenv").config();
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.OCI_REGION || "ap-mumbai-1",
  endpoint: process.env.OCI_ENDPOINT,
  credentials: {
    accessKeyId: process.env.OCI_ACCESS_KEY,
    secretAccessKey: process.env.OCI_SECRET_KEY,
  },
  forcePathStyle: true, // Crucial for OCI S3 Compatibility API
});

module.exports = s3;
