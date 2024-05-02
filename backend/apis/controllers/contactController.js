const service = require("../services/contactService");

const getContact = async (req, res) => {
  const contact = await service.getContact();
  res.send(contact);
};
const updateContact = async (req, res) => {
  const response = await service.updateContact(req.body);
  res.send(response);
};
module.exports = { getContact, updateContact };
