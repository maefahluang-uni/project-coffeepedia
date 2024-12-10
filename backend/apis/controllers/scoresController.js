const service = require("../services/scoresService");

const getAllCategory = async (req, res) => {
  const response = await service.getCategories();
  res.send(response);
};
const getAllCategoryGuest = async (req, res) => {
  const response = await service.getCategoriesGuest();
  res.send(response);
};

const getAllListGuest = async (req, res) => {
  const response = await service.getScoreListsGuest();
  res.send(response);
};

const getAllList = async (req, res) => {
  const response = await service.getScoreLists(req.params.id);
  res.send(response);
};

const postRequestCategory = async (req, res) => {
  const response = await service.postRequestCategory(req, req.body);
  res.send(response);
};

const postRequestScoreList = async (req, res) => {
  const response = await service.postRequestScoreList(req, req.body);
  res.send(response);
};

module.exports = {
  getAllCategory,
  getAllList,
  postRequestCategory,
  postRequestScoreList,
  getAllCategoryGuest,
  getAllListGuest,
};
