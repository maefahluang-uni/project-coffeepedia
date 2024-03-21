const express = require("express");
const contactRouter = require("./contactRoute");
const typeCoffeeRouter = require("./typeCoffeeRoute");
const newsRouter = require("./newsRoute");
const blogsRouter = require("./blogRoute");

const router = express.Router();

router.use("/contact", contactRouter);
router.use("/coffeetypes", typeCoffeeRouter);
router.use("/news", newsRouter);
router.use("/blogs", blogsRouter);

module.exports = router;
