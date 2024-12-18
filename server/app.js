const express = require("express");
const app = express();
const cors = require("cors");
const { frontendURL } = require("./config");
const user = require("./routes/user");
const errorMiddleware = require("./middlewares/errors");

// Middleware
app.use(cors({ origin: frontendURL, credentials: true }));
app.use(express.json());

// Routes
app.use("/api", user);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
