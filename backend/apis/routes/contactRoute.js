const express = require("express");
const controller = require("../controllers/contactController");

const router = express.Router();

router.get("/", controller.getContact);
router.post("/", controller.updateContact);

module.exports = router;
