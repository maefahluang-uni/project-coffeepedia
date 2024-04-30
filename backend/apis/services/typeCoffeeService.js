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

const getTypesCoffee = async (req) => {
  try {
    const adminValue = req.query.admin;
    let isAdmin = false;

    if (adminValue === "true") {
      isAdmin = true;
    }

    let sql = typeCoffeeQueries.GET_TYPES_COFFEE;

    if (isAdmin) {
      sql = typeCoffeeQueries.GET_TYPES_COFFEE_FOR_ADMIN;
    }
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
const getAllProcess = async () => {
  try {
    let sql = typeCoffeeQueries.GET_PROCESS;
    let results = await conn.awaitQuery(sql);

    return JSON.stringify({
      status: 200,
      error: null,
      response: results,
    });
  } catch (err) {
    console.error("Error in getAllProcess function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

const getAllRoast = async () => {
  try {
    let sql = typeCoffeeQueries.GET_ROAST;
    let results = await conn.awaitQuery(sql);

    return JSON.stringify({
      status: 200,
      error: null,
      response: results,
    });
  } catch (err) {
    console.error("Error in getAllRoast function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

const postRequestProcess = async (req, data) => {
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
      if (!data.ProcessName) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = typeCoffeeQueries.INSERT_NEW_PROCESS;
      let results = await conn.awaitQuery(sql, [data.ProcessName]);
      return JSON.stringify({
        status: 200,
        error: null,
        response: results,
      });
    }

    if (isedit && !data.IsActivate) {
      if (!data.ProcessName || !data.ID) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }

      let sql = typeCoffeeQueries.UPDATE_PROCESS;
      let results = await conn.awaitQuery(sql, [data.ProcessName, data.ID]);
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
      let sql = typeCoffeeQueries.UPDATE_PROCESS_ACTIVATE;
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
    console.error("Error in postRequestProcess function:", err);
    console.log("Safe to continute");
    return JSON.stringify({
      status: 400,
      error: "Bad Request",
      response: null,
    });
  }
};

const postRequestRoast = async (req, data) => {
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
      if (!data.RoastName) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = typeCoffeeQueries.INSERT_NEW_ROAST;
      let results = await conn.awaitQuery(sql, [data.RoastName]);
      return JSON.stringify({
        status: 200,
        error: null,
        response: results,
      });
    }

    if (isedit && !data.IsActivate) {
      if (!data.RoastName || !data.ID) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }

      let sql = typeCoffeeQueries.UPDATE_ROAST;
      let results = await conn.awaitQuery(sql, [data.RoastName, data.ID]);
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
      let sql = typeCoffeeQueries.UPDATE_ROAST_ACTIVATE;
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
    console.error("Error in postRequestRoast function:", err);
    console.log("Safe to continute");
    return JSON.stringify({
      status: 400,
      error: "Bad Request",
      response: null,
    });
  }
};

const postRequestTypeCoffee = async (req, data) => {
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
        !data.process ||
        !data.roasted ||
        !data.commonName ||
        !data.intervalTempurature ||
        !data.crackState ||
        !data.flavorDetail
      ) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = typeCoffeeQueries.INSERT_NEW_TYPE_COFFEE;
      let results = await conn.awaitQuery(sql, [
        data.roasted,
        data.process,
        data.commonName,
        data.intervalTempurature,
        data.crackState,
        data.flavorDetail,
        data.moreDetail,
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
        !data.process ||
        !data.roasted ||
        !data.commonName ||
        !data.intervalTempurature ||
        !data.crackState ||
        !data.flavorDetail ||
        !data.moreDetail
      ) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = typeCoffeeQueries.UPDATE_TYPE_COFFEE;
      let results = await conn.awaitQuery(sql, [
        data.roasted,
        data.process,
        data.commonName,
        data.intervalTempurature,
        data.crackState,
        data.flavorDetail,
        data.moreDetail,
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
      let sql = typeCoffeeQueries.UPDATE_TYPE_ACTIVATE;
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
    console.error("Error in postRequestTypeCoffee function:", err);
    console.log("Safe to continute");
    return JSON.stringify({
      status: 400,
      error: "Bad Request",
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
  getAllRoast,
  getAllProcess,
  postRequestProcess,
  postRequestRoast,
  postRequestTypeCoffee,
};
