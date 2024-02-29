const GET_NEWS = `
SELECT * 
FROM news  
ORDER BY news.date DESC;
`;

module.exports = {
  GET_NEWS,
};
