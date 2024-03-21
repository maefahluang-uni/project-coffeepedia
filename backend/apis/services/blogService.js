const config = require("../config");
const mysql = require(`mysql-await`);
const blogQueries = require("./sqlQueries/blogQueries");

const localConnection = mysql.createConnection({
  host: config.LOCAL_MYSQL_DB_URI,
  user: config.LOCAL_MYSQL_DB_USER,
  password: config.LOCAL_MYSQL_DB_PASSWORD,
  database: config.LOCAL_MYSQL_DB,
  port: config.LOCAL_MYSQL_DB_PORT,
});

const cloudConnection = mysql.createConnection({
  host: config.CLOUD_MYSQL_DB_URI,
  user: config.CLOUD_MYSQL_DB_USER,
  password: config.CLOUD_MYSQL_DB_PASSWORD,
  database: config.CLOUD_MYSQL_DB,
  port: config.CLOUD_MYSQL_DB_PORT,
  connectTimeout: 20000,
  acquireTimeout: 20000,
});

const conn = localConnection;

conn.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    throw error;
  }
  console.log("Mysql Connected...");
});

const getBlogs = async () => {
  try {
    let sql = blogQueries.GET_ALL_BLOGS;
    let results = await conn.awaitQuery(sql);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getBlogs function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};
const getTop3Blogs = async () => {
  try {
    let sql = blogQueries.GET_TOP3_BLOGS;
    let results = await conn.awaitQuery(sql);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getTop3Blogs function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};
const getBlogCommentsByID = async (BlogID) => {
  try {
    let sql = blogQueries.GET_BLOG_COMMENTS_BY_ID;
    let results = await conn.awaitQuery(sql, BlogID);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getBlogCommentsByID function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};
const insertCommentIntoBlog = async (data) => {
  const timestamp = new Date(data.timestamp)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  try {
    let sql1 = blogQueries.INSERT_COMMENT_INTO_BLOG;
    let sql2 = blogQueries.UPDATE_COMMENT_COUNT;
    let results1 = await conn.awaitQuery(sql1, [
      data.BlogID,
      data.comment,
      timestamp,
    ]);
    let results2 = await conn.awaitQuery(sql2, data.BlogID);
    return JSON.stringify({
      status: 200,
      error: null,
      response1: results1,
      response2: results2,
    });
  } catch (err) {
    console.error("Error in getBlogCommentsByID function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};
const countBlogs = async () => {
  try {
    let sql = blogQueries.COUNT_BLOGS;
    let results = await conn.awaitQuery(sql);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in countBlogs function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

module.exports = {
  getBlogs,
  getTop3Blogs,
  getBlogCommentsByID,
  insertCommentIntoBlog,
  countBlogs,
};
