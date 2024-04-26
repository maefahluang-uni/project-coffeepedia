const path = require("path");
const multer = require("multer");
const service = require("../services/imageServices");

const uploadImage = async (req, res) => {
  try {
    service.upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error(err);
        return res.status(400).json({ error: "File upload error" });
      } else if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      // File upload successful
      const fileName = req.file.filename;
      const imageUrl = "/images/roasted_coffee/" + fileName;

      res.status(200).json({ imageUrl }); // Send back the image URL in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { uploadImage };
