const service = require("../services/authenticationService");

const getAdmin = async (req, res) => {
  const admin = await service.getAdmin(req.body);
  res.send(admin);
};

module.exports = { getAdmin };
