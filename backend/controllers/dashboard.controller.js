const Dashboard = require("../models/dashboard");

exports.getMetrics = async (req, res) => {
  try {
    const metrics = await Dashboard.findOne().sort({ generated_on: -1 });
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMetrics = async (req, res) => {
  try {
    const newMetrics = await Dashboard.create({
      dailySales: 6200,
      monthlyRevenue: 125000,
      tableOccupancy: "85%",
      popularDishes: [
        "Pizza",
        "Chicken Wings",
        "Burger",
        "Pasta",
        "Tandoori Platter",
      ],
      salesGraphData: [
        { day: "Mon", sales: 1200 },
        { day: "Tue", sales: 1500 },
        { day: "Wed", sales: 1800 },
        { day: "Thu", sales: 1600 },
        { day: "Fri", sales: 2200 },
        { day: "Sat", sales: 2700 },
        { day: "Sun", sales: 1900 },
      ],
      revenueGraphData: [
        { day: "Mon", revenue: 2400 },
        { day: "Tue", revenue: 3000 },
        { day: "Wed", revenue: 3200 },
        { day: "Thu", revenue: 2900 },
        { day: "Fri", revenue: 4100 },
        { day: "Sat", revenue: 5000 },
        { day: "Sun", revenue: 3800 },
      ],
      generated_on: new Date(),
    });

    res.json({
      success: true,
      message: "Dashboard metrics updated",
      data: newMetrics,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
