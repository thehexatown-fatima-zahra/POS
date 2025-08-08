const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendEmail = require("../utils/mailer");
const { generateToken } = require("../utils/token");
const ApiError = require("../utils/ApiError");

const FRONTEND_URL = process.env.FRONTEND_URL;

exports.register = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "subadmin",
  });

  const token = generateToken({ id: user._id, role: user.role });
  return {
    token,
    user: { name: user.name, email: user.email, role: user.role },
  };
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(400, "Invalid credentials");

  const token = generateToken({ id: user._id, role: user.role });
  return {
    token,
    user: { name: user.name, email: user.email, role: user.role },
  };
};

exports.forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "No user found with this email");

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = Date.now() + 60 * 60 * 1000;

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetTokenExpiry;
  await user.save();

  const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;
  const html = `
    <p>Hello ${user.name},</p>
    <p>You requested a password reset. Click the link below:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>If not you, ignore this email.</p>
  `;

  await sendEmail({
    to: user.email,
    subject: "Password Reset Request",
    html,
  });

  return { message: "Password reset email sent." };
};
