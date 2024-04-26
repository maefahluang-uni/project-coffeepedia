const GET_NEWS = `
SELECT * 
FROM news  
WHERE news.IsActivate = 1
ORDER BY news.date DESC;
`;
const GET_NEWS_ADMIN = `
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

const INSERT_NEW_NEWS = `
INSERT INTO 
news 
( 
  title, 
  date, 
  href, 
  newsImageUrl) 
  VALUES ( ?, ?, ?, ?);
`;

const UPDATE_NEWS = `
UPDATE
news 
SET
title =?,
date =?,
href = ?,
newsImageUrl = ?,
WHERE 
news.ID = ?
`;

const UPDATE_NEWS_ACTIVATE = `
UPDATE
news
SET
IsActivate = ?
WHERE
news.ID = ?
`;

module.exports = {
  GET_NEWS,
  COUNT_NEWS,
  INSERT_NEW_NEWS,
  UPDATE_NEWS,
  UPDATE_NEWS_ACTIVATE,
  GET_NEWS_ADMIN,
};
