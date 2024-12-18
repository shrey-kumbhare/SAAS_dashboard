require("dotenv").config();

const config = {
  databaseUri: process.env.DATABASE_URI,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  frontendURL: process.env.BASE_URL,
  cookieTime: process.env.COOKIE_EXPIRES_TIME,
  jwts: process.env.JWT_SECRET,
};

module.exports = config;
