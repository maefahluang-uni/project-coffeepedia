const config = require("../config");
const mysql = require(`mysql-await`);
const siteVisitQuery = require("./sqlQueries/siteVisitQueries");

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

const getTodaySiteVisit = async () => {
  try {
    let sql = siteVisitQuery.COUNT_TODAY_VISIT;
    let results = await conn.awaitQuery(sql);

    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getTodaySiteVisit function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

const siteVisitHandler = async (event) => {
  const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format
  // Check if today's record exists
  const rows = await conn.awaitQuery(siteVisitQuery.SELECT_VISIT_BYDATE, [
    todayDate,
  ]);

  if (rows.length > 0) {
    // If record exists, update the visit count
    await conn.awaitQuery(siteVisitQuery.UPDATE_VISIT, [todayDate]);
    console.log("Visit count updated successfully");
  } else {
    // If no record for today exists, insert a new record
    await conn.awaitQuery(siteVisitQuery.INSERT_NEW_VISIT, [todayDate, 1]);
    console.log("Visit count inserted successfully");
  }
  return JSON.stringify({
    status: 200,
    error: null,
    response: {
      success: true,
      message: "Visit count updated successfully",
    },
  });
};

module.exports = { getTodaySiteVisit, siteVisitHandler };