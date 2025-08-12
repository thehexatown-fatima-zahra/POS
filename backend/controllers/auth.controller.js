const catchAsync = require("../utils/catchAsync");
const authService = require("../services/auth.service");

exports.register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const data = await authService.register(name, email, password);
  res.status(201).json({ message: "Registered successfully", ...data });
});

exports.login = catchAsync(async (req, res) => {
  const { name, password } = req.body;
  const data = await authService.login(name, password);
  res.json(data);
});

exports.forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const response = await authService.forgotPassword(email);
  res.json(response);
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log("toekn", token);
  console.log("password", password);
  const response = await authService.resetPassword(token, password);
  res.json(response);
});
