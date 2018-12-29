const multer = require("multer");
const fs = require('fs');

const ALLOWED_MIME_TYPES = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = ALLOWED_MIME_TYPES[file.mimetype];
    const error = isValid ? null : 'Invalid mime type';
    cb(error, "backend/images/avatars");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = ALLOWED_MIME_TYPES[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

module.exports = multer({ storage: storage }).single("file");
