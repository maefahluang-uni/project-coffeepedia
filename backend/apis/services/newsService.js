const config = require("../config");
const mysql = require(`mysql-await`);
const newsQueries = require("./sqlQueries/newsQueries");
//create database connection
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

//connect to database
conn.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    throw error;
  }
  console.log("Mysql Connected...");
});

const getNews = async (req) => {
  try {
    const adminValue = req.query.admin;
    let isAdmin = false;

    if (adminValue === "true") {
      isAdmin = true;
    }
    let sql = newsQueries.GET_NEWS;
    if (isAdmin) {
      sql = newsQueries.GET_NEWS_ADMIN;
    }
    let results = await conn.awaitQuery(sql);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getNews function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

const countNews = async () => {
  try {
    let sql = newsQueries.COUNT_NEWS;
    let results = await conn.awaitQuery(sql);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in countNews function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

const postRequestNews = async (req, data) => {
  try {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid request data");
    }
    const insertValue = req.query.insert;
    const editValue = req.query.edit;
    let isinsert = false;
    let isedit = false;

    if (insertValue === "true") {
      isinsert = true;
    }
    if (editValue === "true") {
      isedit = true;
    }

    if (isinsert && isedit) {
      return JSON.stringify({
        status: 400,
        error:
          "Bad Request: Provide only one insert or edit parameter at a time",
        response: null,
      });
    }

    if (isinsert) {
      if (!data.title || !data.date || !data.href || !data.newsImageUrl) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = newsQueries.INSERT_NEW_NEWS;
      let results = await conn.awaitQuery(sql, [
        data.title,
        data.date,
        data.href,
        data.newsImageUrl,
      ]);
      return JSON.stringify({
        status: 200,
        error: null,
        response: results,
      });
    }

    if (isedit && !data.IsActivate) {
      if (
        !data.ID ||
        !data.title ||
        !data.date ||
        !data.href ||
        !data.newsImageUrl
      ) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = newsQueries.UPDATE_NEWS;
      let results = await conn.awaitQuery(sql, [
        data.title,
        data.date,
        data.href,
        data.newsImageUrl,
        data.ID,
      ]);
      return JSON.stringify({
        status: 200,
        error: null,
        response: results,
      });
    }
    if (isedit && data.IsActivate) {
      if (!data.IsActivate || !data.ID) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = newsQueries.UPDATE_NEWS_ACTIVATE;
      let results = await conn.awaitQuery(sql, [data.IsActivate, data.ID]);
      return JSON.stringify({
        status: 200,
        error: null,
        response: results,
      });
    }
    return JSON.stringify({
      status: 400,
      error: "Bad Request",
      response: null,
    });
  } catch (err) {
    console.error("Error in postRequestnews function:", err);
    console.log("Safe to continute");
    return JSON.stringify({
      status: 400,
      error: "Bad Request",
      response: null,
    });
  }
};

module.exports = { getNews, countNews, postRequestNews };
