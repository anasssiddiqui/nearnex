const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
  DeleteBucketCommand,
} = require("@aws-sdk/client-s3");
const {
  s3AccessKey,
  s3AccessKeyId,
  bucketName,
  region,
  baseUrl,
  s3BaseUrl,
} = require("../utility/config");
const { getBucketFileUrl } = require("../helper/common");
const AWS = require("aws-sdk");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const s3Configuration = {
  credentials: {
    accessKeyId: s3AccessKeyId,
    secretAccessKey: s3AccessKey,
  },
  region: region,
};

const uploadSingleImage = async ({ file }) => {
  let imageUrl = "";
  if (file.filename) {
    let body = fs.createReadStream(file.path);
    const s3 = new AWS.S3({
      secretAccessKey: s3AccessKey,
      accessKeyId: s3AccessKeyId,
      region: region,
    });

    let params = {
      Bucket: bucketName,
      Key: file.filename,
      Body: body,
      ACL: "public-read",
    };
    const stored = await s3.upload(params, (err, data) => {
      if (err) console.log("error", err, err.stack);
      return data;
    });
    console.log("file uploaded sucessfully>>>", stored);
    // thumbnailUrl = `${baseUrl}/static/videos/thumbnail/${file.filename}`
    imageUrl = `${s3BaseUrl}${file.filename}`;
    
    fs.unlink(file.path, (err) => {
      if (err) console.log("err", err);
    });
  }
  return { imageUrl };
};

module.exports = {
  uploadSingleImage,
};
