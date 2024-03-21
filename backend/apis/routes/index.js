const express = require("express");
const contactRouter = require("./contactRoute");
const typeCoffeeRouter = require("./typeCoffeeRoute");
const newsRouter = require("./newsRoute");

const router = express.Router();

router.use("/contact", contactRouter);
router.use("/coffeetypes", typeCoffeeRouter);
router.use("/news", newsRouter);

module.exports = router;
