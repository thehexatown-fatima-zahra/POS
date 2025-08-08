const mongoose = require("mongoose");
require("dotenv").config();
const Dashboard = require("../models/dashboard");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Dashboard.deleteMany();

  await Dashboard.create({
    dailySales: 8700,
    monthlyRevenue: 128000,
    tableOccupancy: "78%",
    popularDishes: [
      "Fajita Pizza",
      "Zinger Burger",
      "Chicken Wings",
      "Pasta Alfredo",
    ],
    salesGraphData: [
      { day: "Mon", sales: 1200 },
      { day: "Tue", sales: 1600 },
      { day: "Wed", sales: 1100 },
      { day: "Thu", sales: 1400 },
      { day: "Fri", sales: 1800 },
      { day: "Sat", sales: 2100 },
      { day: "Sun", sales: 1600 },
    ],
    revenueGraphData: [
      { day: "Mon", revenue: 3500 },
      { day: "Tue", revenue: 4200 },
      { day: "Wed", revenue: 3000 },
      { day: "Thu", revenue: 3800 },
      { day: "Fri", revenue: 5000 },
      { day: "Sat", revenue: 6200 },
      { day: "Sun", revenue: 4300 },
    ],
    generated_on: new Date(),
  });

  console.log("Dashboard data seeded with expanded dummy values");
  process.exit();
});
