const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/roasted_coffee");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 10 },
}).single("image");

const deleteRoastedCoffeeImage = (data) => {
  const baseUrl = "http://localhost:5000"; // Replace this with your actual base URL
  const relativePath = data.fileUrl
    .replace(baseUrl, "")
    .replace("/image/", "/images/"); // Remove the base URL to get the relative path

  // Construct the absolute file path on the server
  const filePath = path.join(__dirname, "..", "public", relativePath);

  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return JSON.stringify({
          status: 500,
          error: "Error deleting file",
          response: null,
        });
      } else {
        console.log("File deleted successfully:", filePath);
        return JSON.stringify({
          status: 200,
          error: null,
          response: "File deleted successfully",
        });
      }
    });
  } else {
    console.error("File not found:", filePath);
    return JSON.stringify({
      status: 404,
      error: "File not found",
      response: null,
    });
  }
};

module.exports = { upload, deleteRoastedCoffeeImage };
