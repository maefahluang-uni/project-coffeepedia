const express = require("express");
const controller = require("../controllers/imageController");
const router = express.Router();

router.post("/upload", controller.uploadImage);

module.exports = router;
