const multer = require("multer");
const path = require("path");

// Set up multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.FILE_UPLOAD);
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueFilename + path.extname(file.originalname));
  },
});

// Create the multer instance with the storage options
exports.fileUpload = multer({ storage: storage });
