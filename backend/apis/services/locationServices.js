const config = require("../config");
const mysql = require(`mysql-await`);
const locationQueries = require("./sqlQueries/locationQueries");

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

const getLocations = async (req) => {
  try {
    const adminValue = req.query.admin;
    let isAdmin = false;

    if (adminValue === "true") {
      isAdmin = true;
    }
    let sql = locationQueries.GET_ALL_LOCATIONS;
    if (isAdmin) {
      sql = locationQueries.GET_LOCATIONS_FOR_ADMIN;
    }
    let results = await conn.awaitQuery(sql);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getLocations function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

const postRequestLocation = async (req, data) => {
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
      if (
        !data.farmName ||
        !data.locationName ||
        !data.latitude ||
        !data.longtitude ||
        !data.province ||
        !data.district ||
        !data.subdistrict
      ) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = locationQueries.INSERT_NEW_LOCATION;
      let results = await conn.awaitQuery(sql, [
        data.farmName,
        data.locationName,
        data.latitude,
        data.longtitude,
        data.masl,
        data.province,
        data.district,
        data.subdistrict,
        data.zipcode,
        data.image,
      ]);
      return JSON.stringify({
        status: 200,
        error: null,
        response: results,
      });
    }
    if (isedit && !data.IsActivate) {
      if (
        !data.id ||
        !data.farmName ||
        !data.locationName ||
        !data.latitude ||
        !data.longtitude ||
        !data.province ||
        !data.district ||
        !data.subdistrict
      ) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = locationQueries.UPDATE_LOCATION;
      let results = await conn.awaitQuery(sql, [
        data.farmName,
        data.locationName,
        data.latitude,
        data.longtitude,
        data.masl,
        data.province,
        data.district,
        data.subdistrict,
        data.zipcode,
        data.image,
        data.id,
      ]);
      return JSON.stringify({
        status: 200,
        error: null,
        response: results,
      });
    }
    if (isedit && data.IsActivate) {
      if (!data.IsActivate || !data.id) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = locationQueries.UPDATE_LOCATION_ACTIVATE;
      let results = await conn.awaitQuery(sql, [data.IsActivate, data.id]);
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
    console.error("Error in postRequestLocation function:", err);
    return JSON.stringify({
      status: 400,
      error: "Bad Request",
      response: null,
    });
  }
};

module.exports = {
  getLocations,
  postRequestLocation,
};
