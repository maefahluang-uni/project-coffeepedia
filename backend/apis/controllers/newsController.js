const service = require("../services/newsService");

const getNews = async (req, res) => {
  const news = await service.getNews(req);
  res.send(news);
};

const countNews = async (req, res) => {
  const countnews = await service.countNews();
  res.send(countnews);
};

const postRequestNews = async (req, res) => {
  const response = await service.postRequestNews(req, req.body);
  res.send(response);
};
module.exports = { getNews, countNews, postRequestNews };
