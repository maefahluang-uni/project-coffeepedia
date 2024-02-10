const service = require("../services/typeCoffeeService");

const getTypeCoffee = async (req, res) => {
  const types = await service.getTypeCoffee(req.params.id);
  res.send(types);
};
const getTypeCoffeeImages = async (req, res) => {
  const images = await service.getTypeCoffeeImages(req.params.id);
  res.send(images);
};
module.exports = { getTypeCoffee, getTypeCoffeeImages };
