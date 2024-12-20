const express = require("express");
const contactRouter = require("./contactRoute");
const typeCoffeeRouter = require("./typeCoffeeRoute");
const newsRouter = require("./newsRoute");
const blogsRouter = require("./blogRoute");
const imagesRouter = require("./imageRoute");
const authencationRouter = require("./authencationRoute");
const siteVisitRouter = require("./siteVisitRoute");
const locationRouter = require("./locationRoute");
const scoresRouter = require("./scoresRoute");
const router = express.Router();

router.use("/contact", contactRouter);
router.use("/coffeetypes", typeCoffeeRouter);
router.use("/news", newsRouter);
router.use("/blogs", blogsRouter);
router.use("/images", imagesRouter);
router.use("/login", authencationRouter);
router.use("/visithandler", siteVisitRouter);
router.use("/location", locationRouter);
router.use("/scores", scoresRouter);

module.exports = router;
