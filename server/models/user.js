const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/mail");
const { jwts } = require("../config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phone: {
    type: String,
  },
  notifications: {
    email: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
});

// Password encryption before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  // Send notification on user creation
  if (this.notifications.email) {
    const message = `Welcome ${this.name}! Your account has been successfully created in the SAAS Dshboard.`;
    await sendEmail(this.email, "Account Created", message);
  }

  next();
});

// Middleware to handle updates
userSchema.post("findOneAndUpdate", async function (doc) {
  if (doc.notifications.email) {
    const message = `Hi ${doc.name}, your account information has been updated.`;
    await sendEmail(doc.email, "Account Updated", message);
  }
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, jwts, {
    expiresIn: "36000s",
  });
};

module.exports = mongoose.model("User", userSchema);
