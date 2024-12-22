const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");

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

exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    User: users,
  });
});

exports.verifyPass = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user;

  try {
    const { password } = req.query;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (isPasswordValid) {
      return res.status(200).json({ message: "Password is valid" });
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const { userProfile, notifications } = req.body;
  const userId = req.user;

  if (!userProfile && !notifications) {
    return res.status(400).json({ error: "No data provided for update" });
  }

  const updateFields = {};
  if (userProfile) {
    if (userProfile.name) updateFields.name = userProfile.name;
    if (userProfile.email) updateFields.email = userProfile.email;
    if (userProfile.password) {
      updateFields.password = await bcrypt.hash(userProfile.password, 10);
    }
    if (userProfile.phone) {
      updateFields.phone = userProfile.phone;
    }
  }

  if (notifications) {
    updateFields.notifications = notifications;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateFields },
    { new: true, runValidators: true, context: "query" }
  );

  if (!updatedUser) {
    return res.status(404).json({ error: "User not found" });
  }

  res
    .status(200)
    .json({ message: "Profile updated successfully", updatedUser });
});
