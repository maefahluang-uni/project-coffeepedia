const service = require("../services/siteVIsitServices");

const siteVisitHandler = async (req, res) => {
  const response = await service.siteVisitHandler(req);
  res.send(response);
};
const getTodaySiteVisit = async (req, res) => {
  const response = await service.getTodaySiteVisit();
  res.send(response);
};

module.exports = {
  siteVisitHandler,
  getTodaySiteVisit,
};
