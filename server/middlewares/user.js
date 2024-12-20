const User = require("../models/user");
const { jwts } = require("../config");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

//checks if user authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const bearer = req.headers["authorization"];
  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "Not authorized !" });
    return;
  }

  if (!token) {
    return next(
      new ErrorHandler("Please login first to access this resource", 401)
    );
  }
  req.user = await User.findById(token);
  next();
});

//Handling user roles
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (req.user.role == "user") {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access the resource`,
          403
        )
      );
    }
    next();
  };
};
