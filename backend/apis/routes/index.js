const express = require("express");
const contactRoute = require("./contactRoute");
const typeCoffeeRouter = require("./typeCoffeeRoute");

const router = express.Router();

router.use("/contact", contactRoute);
router.use("/coffeetype", typeCoffeeRouter);

module.exports = router;
