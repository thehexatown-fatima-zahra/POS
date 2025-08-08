const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  getMetrics,
  updateMetrics,
} = require("../controllers/dashboard.controller");

router.get("/metrics", auth, getMetrics);
router.post("/update", auth, updateMetrics);

module.exports = router;
