const env = require("./env");
const SERVER_PORT = env.env("SERVER_PORT", 5000);
const LOCAL_MYSQL_DB_URI = env.env("LOCAL_MYSQL_DB_URI", "localhost");
const LOCAL_MYSQL_DB_PORT = env.env("LOCAL_MYSQL_DB_PORT", "3306");
const LOCAL_MYSQL_DB_USER = env.env("LOCAL_MYSQL_DB_USER", "root");
const LOCAL_MYSQL_DB_PASSWORD = env.env("LOCAL_MYSQL_DB_PASSWORD", "root");
const LOCAL_MYSQL_DB = env.env("LOCAL_MYSQL_DB", "dbcoffee_db");

const CLOUD_MYSQL_DB_URI = env.env(
  "CLOUD_MYSQL_DB_URI",
  "mysql-coffeepedia-coffeepedia.a.aivencloud.com"
);
const CLOUD_MYSQL_DB_PORT = env.env("CLOUD_MYSQL_DB_HOST", "23068");
const CLOUD_MYSQL_DB_USER = env.env("CLOUD_MYSQL_DB_USER", "avnadmin");
const CLOUD_MYSQL_DB_PASSWORD = env.env(
  "CLOUD_MYSQL_DB_PASSWORD",
  "AVNS_oCwNhR7YGIeb01gszG0"
);
const CLOUD_MYSQL_DB = env.env("CLOUD_MYSQL_DB", "dbcoffee_db");

module.exports = {
  SERVER_PORT,
  LOCAL_MYSQL_DB_URI,
  LOCAL_MYSQL_DB_PORT,
  LOCAL_MYSQL_DB_USER,
  LOCAL_MYSQL_DB_PASSWORD,
  LOCAL_MYSQL_DB,
  CLOUD_MYSQL_DB_URI,
  CLOUD_MYSQL_DB_PORT,
  CLOUD_MYSQL_DB_USER,
  CLOUD_MYSQL_DB_PASSWORD,
  CLOUD_MYSQL_DB,
};
