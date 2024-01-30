const express = require("express");
const controller = require("../controllers/contactController");

const router = express.Router();

router.get("/contact/", controller.getContact);

module.exports = router;
