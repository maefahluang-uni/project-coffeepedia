const express = require("express");
const controller = require("../controllers/typeCoffeeController");

const router = express.Router();
router.get("/:id", controller.getTypeCoffee);
router.get("/images/:id", controller.getTypeCoffeeImages);

module.exports = router;
