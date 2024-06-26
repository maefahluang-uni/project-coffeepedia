const express = require("express");
const controller = require("../controllers/typeCoffeeController");

const router = express.Router();
router.get("/", controller.getTypesCoffee);
router.post("/", controller.postRequestTypeCoffee);
router.get("/type/:id", controller.getTypeCoffee);
router.get("/type/gasstates/:id", controller.getTypeCoffeeGasStates);
router.get("/type/drinks/:id", controller.getTypeCoffeeDrinkSuggestion);
router.delete("/type/gasstates/:id", controller.deleteGasState);
router.delete("/type/drinks/:id", controller.deleteDrinkSuggestion);
router.put("/type/gasstate", controller.insertGasState);
router.put("/type/drink", controller.insertDrinkSuggestion);
router.get("/images/:id", controller.getTypeCoffeeImages);
router.get("/count", controller.countTypes);
router.get("/process", controller.getAllProcess);
router.post("/process", controller.postRequestProcess);
router.get("/roast", controller.getAllRoast);
router.post("/roast", controller.postRequestRoast);

module.exports = router;
