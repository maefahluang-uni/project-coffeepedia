const GET_NEWS = `
SELECT * 
FROM news  
ORDER BY news.date DESC;
`;

const COUNT_NEWS = `
SELECT 
COUNT(*) 
AS 
news_count 
FROM 
news;
`;

module.exports = {
  GET_NEWS,
  COUNT_NEWS,
};
