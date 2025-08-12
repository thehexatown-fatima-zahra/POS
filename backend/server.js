require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/v1/auth", require("./routes/auth.route"));
app.use("/v1/dashboard", require("./routes/dashboard.route"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});
app.use((err, req, res, next) => {
  console.error(" Error:", err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
