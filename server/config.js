require("dotenv").config();

const config = {
  databaseUri: process.env.DATABASE_URI,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  frontendURL: process.env.BASE_URL,
};

module.exports = config;
