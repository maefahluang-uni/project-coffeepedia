const service = require("../services/typeCoffeeService");

const getTypesCoffee = async (req, res) => {
  const types = await service.getTypesCoffee();
  res.send(types);
};
const getTypeCoffee = async (req, res) => {
  const type = await service.getTypeCoffee(req.params.id);
  res.send(type);
};

const getTypeCoffeeGasStates = async (req, res) => {
  const gasStates = await service.getTypeCoffeeGasStates(req.params.id);
  res.send(gasStates);
};

const getTypeCoffeeImages = async (req, res) => {
  const images = await service.getTypeCoffeeImages(req.params.id);
  res.send(images);
};

const getTypeCoffeeDrinkSuggestion = async (req, res) => {
  const drinks = await service.getTypeCoffeeDrinkSuggestion(req.params.id);
  res.send(drinks);
};
const countTypes = async (req, res) => {
  const counttypes = await service.countTypes();
  res.send(counttypes);
};
const getAllRoastAndProcess = async (req, res) => {
  const roastandprocess = await service.getAllRoastAndProcess();
  res.send(roastandprocess);
};
const insertNewProcess = async (req, res) => {
  const insertedprocess = await service.insertNewProcess(req.body);
  res.send(insertedprocess);
};

module.exports = {
  getTypesCoffee,
  getTypeCoffee,
  getTypeCoffeeGasStates,
  getTypeCoffeeImages,
  getTypeCoffeeDrinkSuggestion,
  countTypes,
  getAllRoastAndProcess,
  insertNewProcess,
};
