const service = require("../services/contactService");

const getContact = async (req, res) => {
  const contact = await service.getContact();
  res.send(contact);
};

module.exports = { getContact };
