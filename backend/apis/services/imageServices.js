const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/roasted_coffee");
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + file.originalname; // Add a timestamp to avoid filename conflicts
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 10 },
}).single("image");

module.exports = { upload };
