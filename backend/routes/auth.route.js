const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth.controller");
const { loginSchema } = require("../validations/auth.validation");
const validate = require("../middleware/validate");

router.post("/login", validate(loginSchema), login);

module.exports = router;
