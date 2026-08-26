const { PutObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require("sharp");
const path = require("path");
const s3 = require("../config/s3");

async function uploadToS3(folder, file) {
  // 1. Strip original extension and sanitize filename
  const rawName = path.parse(file.originalname).name.replace(/\s+/g, "-");
  const key = `${folder}/${Date.now()}-${rawName}webp`;

  // 2. Compress and optimize image using Sharp
  const optimizedBuffer = await sharp(file.buffer)
    .resize({
      width: 1200, // Max width of 1200px (standard for modern blog heroes)
      withoutEnlargement: true, // Don't upscale smaller images
    })
    .webp({ quality: 80 }) // Convert to WebP at 80% quality (ideal performance/quality balance)
    .toBuffer();

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.OCI_BUCKET_NAME,
      Key: key,
      Body: optimizedBuffer,
      ContentType: "image/webp",
    }),
  );

  // Direct public URL for OCI Object Storage
  const publicUrl = `https://objectstorage.${process.env.OCI_REGION}.oraclecloud.com/n/${process.env.OCI_NAMESPACE}/b/${process.env.OCI_BUCKET_NAME}/o/${encodeURIComponent(key)}`;

  return publicUrl;
}

module.exports = {
  uploadToS3,
};
