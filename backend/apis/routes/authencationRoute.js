const express = require("express");
const controller = require("../controllers/authencationController");

const router = express.Router();

router.post("/", controller.getAdmin);

module.exports = router;
