const service = require("../services/typeCoffeeService");

const getTypesCoffee = async (req, res) => {
  const types = await service.getTypesCoffee(req);
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
const getAllRoast = async (req, res) => {
  const roast = await service.getAllRoast();
  res.send(roast);
};

const getAllProcess = async (req, res) => {
  const process = await service.getAllProcess();
  res.send(process);
};

const postRequestProcess = async (req, res) => {
  const response = await service.postRequestProcess(req, req.body);
  res.send(response);
};
const postRequestRoast = async (req, res) => {
  const response = await service.postRequestRoast(req, req.body);
  res.send(response);
};

const postRequestTypeCoffee = async (req, res) => {
  const response = await service.postRequestTypeCoffee(req, req.body);
  res.send(response);
};
module.exports = {
  getTypesCoffee,
  getTypeCoffee,
  getTypeCoffeeGasStates,
  getTypeCoffeeImages,
  getTypeCoffeeDrinkSuggestion,
  countTypes,
  getAllRoast,
  getAllProcess,
  postRequestProcess,
  postRequestRoast,
  postRequestTypeCoffee,
};
