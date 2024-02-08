const express = require("express");
const controller = require("../controllers/typeCoffeeController");

const router = express.Router();
router.get("/", controller.getAllTypeCoffee);

module.exports = router;
