const service = require("../services/newsService");

const getNews = async (req, res) => {
  const news = await service.getNews();
  res.send(news);
};
module.exports = { getNews };
