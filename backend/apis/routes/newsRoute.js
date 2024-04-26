const express = require("express");
const controller = require("../controllers/newsController");

const router = express.Router();

router.get("/", controller.getNews);
router.get("/count", controller.countNews);
router.post("/", controller.postRequestNews);

module.exports = router;
