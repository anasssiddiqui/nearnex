const multer = require("multer");
const fs = require("fs");
const {
  postUpload,
} = require("../helper/fileStorage");
const path = require("path");

const allowedFormats = [".jpg", ".jpeg", ".png", ".PNG", ".mp4", ".mp3", ".mpeg"];

// const {
//     videoUpload,thumbnailUpload,postUpload
// } = require("../helper/fileStorage");

// Thumbnail upload 

let imageStorage = multer.diskStorage({

  destination: function (req, file, cb) {
    const dir = "./public/image";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }, (err) => { });
    }
    cb(null, "public/image");
  },
  filename: function (req, file, cb) {
    // const newName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now() + file.originalname.replace(/\s/g, ""));
  },
});

let imageUpload = multer({
  storage: imageStorage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
    fieldNameSize: 200,
    fileSize: 1024 * 1024 * 50,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|gif|GIF|JPEG|png|PNG|webp|WEBP|mp4|MP4|mov|MOV|avi|AVI|wmv|WMV|MKV|mkv|webm|WEBM)$/)) {
      console.log("inside the errror invalid format", file);
      return cb(new multer.MulterError("You can only upload image and video"));
    }
    cb(undefined, true);
  },
});


const checkMulterErr = (code) => {
  if (code === "LIMIT_FILE_SIZE") {
    return "Max file size should be 15 MB"
  }
}

// upload single image file

let uploadSigleImage = imageUpload.single("image");

const uploadSigleImageFile = async (req, res, next) => {
  try {
    uploadSigleImage(req, res, async (err) => {
      console.log("file inside deploy server++++++++++", req.file);
      // if (!req.files) {
      //   return res
      //     .status(400)
      //     .send({ success: false, message: "No file uploaded" });
      // } else
      if (err instanceof multer.MulterError) {
        return res.status(400).send({
          isError: true,
          message: err && err.code && err.code !== 'LIMIT_FILE_SIZE' ? err.code : checkMulterErr(err.code),
        });
      } else if (err) {
        return res.status(400).send({ isError: true, message: err });
      }
      // req.file = req.file;
      next();
    });
  } catch (error) {
    console.log("error from uploadSigleImageFile middleware", error);
    return res.status(400).send({ isError: true, error: error.message });
  }
};

const getStorage = ({ pathName }) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = `./public/${pathName}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }, (err) => { });
      }
      cb(null, `public/${pathName}`);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.replace(/\s/g, ""));
    },
  });
};

const setUploadFileConfig = ({ pathName, limit = 15 }) => {
  return multer({
    storage: getStorage({ pathName }),
    limits: {
      fieldSize: 1024 * 1024 * 15,
      fieldNameSize: 200,
      fileSize: 1024 * 1024 * 15,
    },
    fileFilter(req, file, cb) {
      if (!allowedFormats.includes(path.extname(file.originalname))) {

        console.log("inside the errror invalid format", path.extname(file.originalname));
        return cb(new multer.MulterError("Only image allowed"));
      }
      cb(undefined, true);
    },
  });
};

/**
 * @description - This function is used to upload single file to a path mentioned in params
 */

function uploadImage(path, fieldName, limit, isRequired) {
  return function file(req, res, next) {
    try {
      const uploadPic = setUploadFileConfig({
        path: path,
        pathName: path,
        limit: limit,
      });
      const uploadSingleIm = uploadPic.single(fieldName);
      uploadSingleIm(req, res, async (err) => {

        console.log("file inside ++++++++++", { file: req.file });
        if (err instanceof multer.MulterError) {
          return res.status(400).send({
            success: false,
            message: err && err.code ? err.code : err,
            error: err,
          });
        } else if (isRequired && !req.file) {
          return res
            .status(400)
            .send({ success: false, message: `Error uploading ${fieldName}` });
        } else if (err) {
          return res.status(400).send({ success: false, message: err });
        }
        next();
      });
    } catch (error) {
      console.log(`error from upload ${fieldName} middlewar`, error);
      return res.status(400).send({ error: error });
      // next(error)
    }
  };
}


module.exports = {
  uploadSigleImageFile,
  uploadImage
}