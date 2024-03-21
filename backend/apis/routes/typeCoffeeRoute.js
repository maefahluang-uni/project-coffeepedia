const express = require("express");
const controller = require("../controllers/typeCoffeeController");

const router = express.Router();
router.get("/", controller.getTypesCoffee);
router.get("/type/:id", controller.getTypeCoffee);
router.get("/type/gasstates/:id", controller.getTypeCoffeeGasStates);
router.get("/type/drinks/:id", controller.getTypeCoffeeDrinkSuggestion);
router.get("/images/:id", controller.getTypeCoffeeImages);
router.get("/count", controller.countTypes);

module.exports = router;
