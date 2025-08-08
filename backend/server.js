require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/dashboard", require("./routes/dashboard.route"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
