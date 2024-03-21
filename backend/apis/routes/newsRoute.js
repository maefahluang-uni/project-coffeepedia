const express = require("express");
const controller = require("../controllers/newsController");

const router = express.Router();

router.get("/", controller.getNews);
router.get("/count", controller.countNews);

module.exports = router;
