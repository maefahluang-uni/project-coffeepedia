const config = require("../config");
const mysql = require(`mysql-await`);
const typeCoffeeQueries = require("./sqlQueries/typeCoffeeQueries");

//create database connection
const conn = mysql.createConnection({
  connectionLimit: 10,
  host: config.MYSQL_DB_URI,
  user: config.MYSQL_DB_USER,
  password: config.MYSQL_DB_PASSWORD,
  database: config.MYSQL_DB,
  port: config.MYSQL_DB_PORT,
});

conn.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    throw error;
  }
  console.log("Mysql Connected...");
});

const getTypeCoffee = async (TypeID) => {
  try {
    let sql = typeCoffeeQueries.GET_TYPE_COFFEE_BY_ID;
    let results = await conn.awaitQuery(sql, TypeID);

    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getTypeCoffee function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

const getTypeCoffeeImages = async (TypeID) => {
  try {
    let sql = typeCoffeeQueries.GET_TYPE_COFFEE_IMAGE_BY_TYPE_ID;
    let results = await conn.awaitQuery(sql, TypeID);

    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getTypeCoffeeImages function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

module.exports = { getTypeCoffee, getTypeCoffeeImages };
