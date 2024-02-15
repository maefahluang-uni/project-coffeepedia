const service = require("../services/typeCoffeeService");

const getTypesCoffee = async (req, res) => {
  const types = await service.getTypesCoffee();
  res.send(types);
};
const getTypeCoffee = async (req, res) => {
  const type = await service.getTypeCoffee(req.params.id);
  res.send(type);
};
const getTypeCoffeeImages = async (req, res) => {
  const images = await service.getTypeCoffeeImages(req.params.id);
  res.send(images);
};
module.exports = { getTypesCoffee, getTypeCoffee, getTypeCoffeeImages };
