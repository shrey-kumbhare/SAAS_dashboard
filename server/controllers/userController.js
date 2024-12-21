const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

//Register user=>/api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 200, res);
});

//Login User=> /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  //finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  //password checker
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

//Logout user=>/api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
});

exports.getTotalUsers = catchAsyncErrors(async (req, res, next) => {
  const userCount = await User.countDocuments();
  res.status(200).json({
    success: true,
    totalUsers: userCount,
  });
});

exports.getUserTime = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({}, { createdAt: 1, _id: 0 }).sort({
    createdAt: 1,
  });
  const createdAtTimes = users.map((user) => user.createdAt);

  res.status(200).json({
    success: true,
    createdAt: createdAtTimes,
  });
});
