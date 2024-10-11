const service = require("../services/locationServices");

const getAllLocation = async (req, res) => {
  const locations = await service.getLocations(req);
  res.send(locations);
};

const postRequestLocation = async (req, res) => {
  const response = await service.postRequestLocation(req, req.body);
  res.send(response);
};

module.exports = {
  getAllLocation,
  postRequestLocation,
};
