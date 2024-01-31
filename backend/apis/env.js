const config = require("dotenv");
config.config();

const env = (key, defaultValue) => {
  return process.env[key] || defaultValue;
};

module.exports = { env };
