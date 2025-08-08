const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/user");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.deleteMany(); // Optional: remove old users

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@admin.com",
    password: hashedPassword,
    role: "admin", // very important for RBAC
  });

  console.log("✅ Admin user seeded");
  process.exit();
});
