const express = require("express");
const controller = require("../controllers/siteVisitController");

const router = express.Router();

router.get("/handler", controller.siteVisitHandler);
router.get("/visit_count", controller.getTodaySiteVisit);

module.exports = router;
