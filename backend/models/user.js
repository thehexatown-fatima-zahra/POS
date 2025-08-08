const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "subadmin"], default: "subadmin" },
  resetToken: String,
  resetTokenExpires: Date,
});

module.exports = mongoose.model("User", userSchema);
