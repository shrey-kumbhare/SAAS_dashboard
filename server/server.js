const express = require("express");
const connectDatabase = require("./config/database");
const { port, nodeEnv } = require("./config");
const app = require("./app");
process.on("uncaughtException", (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

connectDatabase();

const server = app.listen(port, () => {
  console.log(`Server started on PORT: ${port} in ${nodeEnv} mode.`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to unhandles promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
