require("dotenv").config();

const config = {
  databaseUri: process.env.DATABASE_URI,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  frontendURL: process.env.BASE_URL,
  cookieTime: process.env.COOKIE_EXPIRES_TIME,
  jwts: process.env.JWT_SECRET,
  ownerMail: process.env.MAIL,
  passw: process.env.MAIL_PASSWORD,
  twilioAccountSid: process.env.TSSID,
  twilioAuthToken: process.env.TAUTH_TOKEN,
  twilioPhoneNumber: process.env.TPHONE_NO,
};

module.exports = config;
