const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  dailySales: Number,
  monthlyRevenue: Number,
  tableOccupancy: String,
  popularDishes: [String],
  salesGraphData: {
    daily: [Object],
    weekly: [Object],
    monthly: [Object],
  },
  revenueGraphData: {
    daily: [Object],
    weekly: [Object],
    monthly: [Object],
  },
  generated_on: Date,
});

module.exports = mongoose.model("Dashboard", dashboardSchema);
