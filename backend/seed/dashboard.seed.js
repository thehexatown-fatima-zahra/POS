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

    salesGraphData: {
      daily: [
        { day: "Mon", sales: 1200 },
        { day: "Tue", sales: 1600 },
        { day: "Wed", sales: 1100 },
        { day: "Thu", sales: 1400 },
        { day: "Fri", sales: 1800 },
        { day: "Sat", sales: 2100 },
        { day: "Sun", sales: 1600 },
      ],
      weekly: [
        { week: "Week 1", sales: 5200 },
        { week: "Week 2", sales: 6800 },
        { week: "Week 3", sales: 7500 },
        { week: "Week 4", sales: 8200 },
      ],
      monthly: [
        { month: "Jan", sales: 25000 },
        { month: "Feb", sales: 28000 },
        { month: "Mar", sales: 30000 },
        { month: "Apr", sales: 32000 },
        { month: "May", sales: 35000 },
        { month: "Jun", sales: 37000 },
        { month: "Jul", sales: 40000 },
        { month: "Aug", sales: 42000 },
        { month: "Sep", sales: 45000 },
        { month: "Oct", sales: 47000 },
        { month: "Nov", sales: 49000 },
        { month: "Dec", sales: 52000 },
      ],
    },

    revenueGraphData: {
      daily: [
        { day: "Mon", revenue: 3500 },
        { day: "Tue", revenue: 4200 },
        { day: "Wed", revenue: 3000 },
        { day: "Thu", revenue: 3800 },
        { day: "Fri", revenue: 5000 },
        { day: "Sat", revenue: 6200 },
        { day: "Sun", revenue: 4300 },
      ],
      weekly: [
        { week: "Week 1", revenue: 14500 },
        { week: "Week 2", revenue: 15800 },
        { week: "Week 3", revenue: 17200 },
        { week: "Week 4", revenue: 18900 },
      ],
      monthly: [
        { month: "Jan", revenue: 62000 },
        { month: "Feb", revenue: 68000 },
        { month: "Mar", revenue: 71000 },
        { month: "Apr", revenue: 74000 },
        { month: "May", revenue: 78000 },
        { month: "Jun", revenue: 80000 },
        { month: "Jul", revenue: 85000 },
        { month: "Aug", revenue: 87000 },
        { month: "Sep", revenue: 91000 },
        { month: "Oct", revenue: 93000 },
        { month: "Nov", revenue: 96000 },
        { month: "Dec", revenue: 100000 },
      ],
    },

    generated_on: new Date(),
  });

  console.log(" Dashboard data seeded with daily, weekly, and monthly values");
  process.exit();
});
