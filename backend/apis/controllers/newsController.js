const service = require("../services/newsService");

const getNews = async (req, res) => {
  const news = await service.getNews();
  res.send(news);
};

const countNews = async (req, res) => {
  const countnews = await service.countNews();
  res.send(countnews);
};
module.exports = { getNews, countNews };
