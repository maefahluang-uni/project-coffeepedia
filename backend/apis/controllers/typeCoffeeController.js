const service = require("../services/typeCoffeeService");

const getAllTypeCoffee = async (req, res) => {
  const types = await service.getAllTypeCoffee();
  res.send(types);
};
module.exports = { getAllTypeCoffee };
