const fs = require("fs");
const multer = require("multer");

// single video or image upload 

var videoStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        const dir = "./public/videos";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }, (err) => { });
        }
        cb(null, "public/videos");
    },
    filename: function (req, file, cb) {
        // const newName = file.originalname.replace(/\s/g, "");
        cb(null, Date.now() + file.originalname.replace(/\s/g, ""));
    },
});

var videoUpload = multer({
    storage: videoStorage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
        fieldNameSize: 200,
        fileSize: 1024 * 1024 * 15,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|gif|GIF|JPEG|png|PNG|webp|WEBP|mp4|MP4|mov|MOV|avi|AVI|wmv|WMV|MKV|mkv|webm|WEBM)$/)) {
            console.log("inside the errror invalid format", file);
            return cb(new multer.MulterError("You can only upload image and video"));
        }
        cb(undefined, true);
    },
});

// Thumbnail upload 

var imageStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        const dir = "./public/images";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }, (err) => { });
        }
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        // const newName = file.originalname.replace(/\s/g, "");
        cb(null, Date.now() + file.originalname.replace(/\s/g, ""));
    },
});

var imageUpload = multer({
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

// post upload 

var postStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        const dir = "./public/images";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }, (err) => { });
        }
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        // const newName = file.originalname.replace(/\s/g, "");
        cb(null, Date.now() + file.originalname.replace(/\s/g, ""));
    },
});

var postUpload = multer({
    storage: postStorage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
        fieldNameSize: 200,
        fileSize: 1024 * 1024 * 50,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|gif|GIF|JPEG|png|PNG|webp|WEBP|mp4|MP4|mov|MOV|avi|AVI|mpeg|wmv|WMV|MKV|mkv|webm|WEBM)$/)) {
            console.log("inside the errror invalid format", file);
            return cb(new multer.MulterError("You can only upload image and video"));
        }
        cb(undefined, true);
    },
});

module.exports = { videoUpload, imageUpload,postUpload}