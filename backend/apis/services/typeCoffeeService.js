const config = require("../config");
const mysql = require(`mysql-await`);
const typeCoffeeQueries = require("./sqlQueries/typeCoffeeQueries");

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

conn.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    throw error;
  }
  console.log("Mysql Connected...");
});

const getTypesCoffee = async () => {
  try {
    let sql = typeCoffeeQueries.GET_TYPES_COFFEE;
    let results = await conn.awaitQuery(sql);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getTypesCoffee function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

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

const getTypeCoffeeGasStates = async (TypeID) => {
  try {
    let sql = typeCoffeeQueries.GET_TYPE_COFFEE_GAS_STATES;
    let results = await conn.awaitQuery(sql, TypeID);

    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getTypeCoffeeGasStates function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

const getTypeCoffeeImages = async (TypeID) => {
  try {
    let sql = typeCoffeeQueries.GET_TYPE_COFFEE_IMAGES_BY_TYPE_ID;
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

const getTypeCoffeeDrinkSuggestion = async (TypeID) => {
  try {
    let sql = typeCoffeeQueries.GET_TYPE_COFFEE_DRINK_SUGGESTION_BY_TYPE_ID;
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

const countTypes = async () => {
  try {
    let sql = typeCoffeeQueries.COUNT_TYPES;
    let results = await conn.awaitQuery(sql);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in countTypes function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};
const getAllRoastAndProcess = async () => {
  try {
    let sql1 = typeCoffeeQueries.GET_PROCESS;
    let sql2 = typeCoffeeQueries.GET_ROAST;
    let results1 = await conn.awaitQuery(sql1);
    let results2 = await conn.awaitQuery(sql2);

    return JSON.stringify({
      status: 200,
      error: null,
      response1: results1,
      response2: results2,
    });
  } catch (err) {
    console.error("Error in getAllRoastAndProcess function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

const insertNewProcess = async (data) => {
  try {
    let sql = typeCoffeeQueries.INSERT_NEW_PROCESS;
    let results = await conn.awaitQuery(sql, [data.RoastName]);
    return JSON.stringify({
      status: 200,
      error: null,
      response: results,
    });
  } catch {
    console.error("Error in insertNewProcess function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

module.exports = {
  getTypesCoffee,
  getTypeCoffee,
  getTypeCoffeeGasStates,
  getTypeCoffeeImages,
  getTypeCoffeeDrinkSuggestion,
  countTypes,
  getAllRoastAndProcess,
  insertNewProcess,
};
