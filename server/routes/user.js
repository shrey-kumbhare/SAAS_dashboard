const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getTotalUsers,
  getUserTime,
  getUser,
  verifyPass,
  updateUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/user");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/totalUsers").get(isAuthenticatedUser, getTotalUsers);
router.route("/UserTime").get(isAuthenticatedUser, getUserTime);
router.route("/User").get(isAuthenticatedUser, getUser);
router.route("/verifyPass").get(isAuthenticatedUser, verifyPass);
router.route("/updateUser").patch(isAuthenticatedUser, updateUser);

module.exports = router;
