const express = require("express");
const controller = require("../controllers/locationController");

const router = express.Router();
router.get("/", controller.getAllLocation);
router.post("/post_request", controller.postRequestLocation);

module.exports = router;
