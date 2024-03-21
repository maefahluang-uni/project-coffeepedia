const GET_ALL_BLOGS = `
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
ORDER BY blog_comment.datetime DESC;
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

module.exports = {
  GET_ALL_BLOGS,
  GET_TOP3_BLOGS,
  GET_BLOG_COMMENTS_BY_ID,
  INSERT_COMMENT_INTO_BLOG,
  UPDATE_COMMENT_COUNT,
};
