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

const getNews = async () => {
  try {
    let sql = newsQueries.GET_NEWS;
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
module.exports = { getNews, countNews };
