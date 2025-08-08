const express = require("express");
const router = express.Router();
const {
  login,
  register,
  forgotPassword,
} = require("../controllers/auth.controller");

const {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
} = require("../validations/auth.validation");
const validate = require("../middleware/validate");

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);

module.exports = router;
