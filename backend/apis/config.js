const env = require("./env");
const SERVER_PORT = env.env("SERVER_PORT", 5000);
const MYSQL_DB_URI = env.env("MYSQL_DB_URI", "localhost");
const MYSQL_DB_PORT = env.env("MYSQL_DB_PORT", "3306");
const MYSQL_DB_USER = env.env("MYSQL_DB_USER", "root");
const MYSQL_DB_PASSWORD = env.env("MYSQL_DB_PASSWORD", "root");
const MYSQL_DB = env.env("MYSQL_DB", "dbcoffee_db");

module.exports = {
  SERVER_PORT,
  MYSQL_DB_URI,
  MYSQL_DB_PORT,
  MYSQL_DB_USER,
  MYSQL_DB_PASSWORD,
  MYSQL_DB,
};
