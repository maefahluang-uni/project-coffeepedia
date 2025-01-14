const express = require("express");
const controller = require("../controllers/scoresController");

const router = express.Router();
router.get("/categories", controller.getAllCategory);
router.get("/lists/:id", controller.getAllList);
router.post("/post_request_category", controller.postRequestCategory);
router.post("/post_request_list", controller.postRequestScoreList);
router.get("/categories_map", controller.getAllCategoryGuest);
router.get("/lists_map", controller.getAllListGuest);
router.get("/varieties", controller.getAllVarieties);
router.get("/variety_score/:id", controller.getAllVarietyScores);
module.exports = router;
