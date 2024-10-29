const GET_ALL_BLOGS = `
SELECT * 
FROM 
blog 
WHERE 
blog.IsActivate = '1'
ORDER BY 
blog.date 
DESC 
`;
const GET_ALL_BLOGS_ADMIN = `
SELECT * 
FROM 
blog 
ORDER BY 
blog.date 
DESC;
`;

const GET_TOP3_BLOGS = `
SELECT * 
FROM 
blog 
WHERE 
blog.IsActivate = '1'
ORDER BY 
viewCount 
DESC 
LIMIT 3;
`;

const GET_BLOG_COMMENTS_BY_ID = `
SELECT blog_comment.comment,blog_comment.datetime 
FROM
blog_comment 
JOIN
blog on blog.ID = blog_comment.blogID
WHERE
blog.ID = ?
ORDER BY blog_comment.datetime ASC;
`;

const INSERT_COMMENT_INTO_BLOG = `
INSERT 
INTO 
blog_comment 
( blogID, comment, datetime) 
VALUES 
( ?, ?, ?);
`;

const UPDATE_COMMENT_COUNT = `
UPDATE 
blog 
SET 
commentCount = commentCount + 1 
WHERE 
blog.ID = ?;
`;

const UPDATE_VIEW_COUNT = `
UPDATE
blog
SET
viewCount = viewCount + 1
WHERE
blog.ID = ?;
`;

const COMMENT_COUNT_TODAY = `
SELECT 
COUNT(*) 
AS 
comment_count 
FROM 
blog_comment 
WHERE 
DATE(datetime) = CURDATE();
`;

const COUNT_BLOGS = `
SELECT 
COUNT(*) 
AS 
blog_count 
FROM 
blog;
`;

const INSERT_NEW_BLOG = `
INSERT INTO 
blog 
( 
  title, 
  date, 
  content, 
  imageURL
) 
  VALUES ( ?, ?, ?, ?);
`;

const UPDATE_BLOG = `
UPDATE
blog
SET
title =?,
date =?,
content = ?,
imageURL = ?
WHERE 
blog.ID = ?
`;

const UPDATE_BLOG_ACTIVATE = `
UPDATE
blog
SET
IsActivate = ?
WHERE
blog.ID = ?
`;

module.exports = {
  GET_ALL_BLOGS,
  GET_ALL_BLOGS_ADMIN,
  GET_TOP3_BLOGS,
  GET_BLOG_COMMENTS_BY_ID,
  INSERT_COMMENT_INTO_BLOG,
  UPDATE_COMMENT_COUNT,
  UPDATE_VIEW_COUNT,
  COMMENT_COUNT_TODAY,
  COUNT_BLOGS,
  INSERT_NEW_BLOG,
  UPDATE_BLOG,
  UPDATE_BLOG_ACTIVATE,
};
