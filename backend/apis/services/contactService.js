const config = require("../config");
const mysql = require(`mysql-await`);
const contactQueries = require("./sqlQueries/contactQueries");
//create database connection
const conn = mysql.createConnection({
  connectionLimit: 10,
  host: config.MYSQL_DB_URI,
  user: config.MYSQL_DB_USER,
  password: config.MYSQL_DB_PASSWORD,
  database: config.MYSQL_DB,
  port: config.MYSQL_DB_PORT,
});
//connect to database
conn.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    throw error;
  }
  console.log("Mysql Connected...");
});

const getContact = async () => {
  try {
    let sql = contactQueries.GET_CONTACT_INFO;
    let results = await conn.awaitQuery(sql);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getContact function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

module.exports = { getContact };
