const config = require("../config");
const mysql = require(`mysql-await`);
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

const getAllTypeCoffee = async () => {
  try {
    /*"SELECT type_coffee.ID, roast_level.RoastName, 
    coffee_process.ProcessName, type_coffee.Tempurature, 
    type_coffee.CrackState, type_coffee.Flavor, type_coffee.MoreDetail,
    type_coffee_image.ImageDataFront,type_coffee_image.ImageDataBack 
    FROM `type_coffee` 
    JOIN roast_level ON type_coffee.RoastLevelID = roast_level.ID 
    JOIN coffee_process ON type_coffee.CoffeeProcessID = coffee_process.ID 
    JOIN type_coffee_image ON type_coffee_image.TypeID = type_coffee.ID 
    WHERE roast_level.IsActivate = 1 AND coffee_process.IsActivate = 1;" */
    let sql =
      "SELECT type_coffee.ID, roast_level.RoastName, coffee_process.ProcessName, type_coffee.Tempurature, type_coffee.CrackState, type_coffee.Flavor, type_coffee.MoreDetail,type_coffee_image.ImageDataFront,type_coffee_image.ImageDataBack FROM `type_coffee` JOIN roast_level ON type_coffee.RoastLevelID = roast_level.ID JOIN coffee_process ON type_coffee.CoffeeProcessID = coffee_process.ID JOIN type_coffee_image ON type_coffee_image.TypeID = type_coffee.ID WHERE roast_level.IsActivate = 1 AND coffee_process.IsActivate = 1;";
    let results = await conn.awaitQuery(sql);

    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getAllTypeCoffee function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

module.exports = { getAllTypeCoffee };
