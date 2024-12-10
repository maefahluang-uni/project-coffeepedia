const config = require("../config");
const mysql = require(`mysql-await`);
const scoresQuery = require("./sqlQueries/scoreQueries");

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

const getCategories = async () => {
  try {
    let sql = scoresQuery.GET_ALL_SCORE_CATEGORIES;

    let results = await conn.awaitQuery(sql);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getCategories function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};
const getCategoriesGuest = async () => {
  try {
    let sql = scoresQuery.GET_ALL_SCORE_CATEGORIES_GUEST;

    let results = await conn.awaitQuery(sql);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getCategoriesGuest function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

const getScoreListsGuest = async () => {
  try {
    let sql = scoresQuery.GET_ALL_SCORE_LISTS_GUEST;
    let results = await conn.awaitQuery(sql);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getScoreListsGuest function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

const getScoreLists = async (id) => {
  try {
    let sql = scoresQuery.GET_ALL_SCORE_LISTS_BY_CATEGORY_ID;

    let results = await conn.awaitQuery(sql, [id]);
    return JSON.stringify({ status: 200, error: null, response: results });
  } catch (err) {
    console.error("Error in getScoreLists function:", err);
    return JSON.stringify({
      status: 500,
      error: "Internal Server Error",
      response: null,
    });
  }
};

const postRequestCategory = async (req, data) => {
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
      if (!data.name) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = scoresQuery.INSERT_NEW_CATEGORY;
      let results = await conn.awaitQuery(sql, [data.name]);
      return JSON.stringify({
        status: 200,
        error: null,
        response: results,
      });
    }
    if (isedit && !data.IsActivate) {
      if (!data.ID || !data.name) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = scoresQuery.UPDATE_CATEGORY;
      let results = await conn.awaitQuery(sql, [data.name, data.ID]);
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
      let sql = scoresQuery.UPDATE_CATEGORY_ACTIVATE;
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
    console.error("Error in postRequestCategory function:", err);
    return JSON.stringify({
      status: 400,
      error: "Bad Request",
      response: null,
    });
  }
};

const postRequestScoreList = async (req, data) => {
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
      if (!data.name || !data.categoryID) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = scoresQuery.INSERT_NEW_LIST;
      let results = await conn.awaitQuery(sql, [
        data.categoryID,
        data.name,
        data.unit,
      ]);
      return JSON.stringify({
        status: 200,
        error: null,
        response: results,
      });
    }
    if (isedit && !data.IsActivate) {
      if (!data.ID || !data.name) {
        return JSON.stringify({
          status: 400,
          error: "Bad Request: Missing body parameter",
          response: null,
        });
      }
      let sql = scoresQuery.UPDATE_LIST;
      let results = await conn.awaitQuery(sql, [data.name, data.unit, data.ID]);
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
      let sql = scoresQuery.UPDATE_LIST_ACTIVATE;
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
    console.error("Error in postRequestScoreList function:", err);
    return JSON.stringify({
      status: 400,
      error: "Bad Request",
      response: null,
    });
  }
};

module.exports = {
  getCategories,
  getScoreLists,
  postRequestCategory,
  postRequestScoreList,
  getCategoriesGuest,
  getScoreListsGuest,
};
