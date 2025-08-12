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
      salesGraphData: {
        daily: [
          { name: "Mon", sales: 1200 },
          { name: "Tue", sales: 1500 },
          { name: "Wed", sales: 1800 },
          { name: "Thu", sales: 1600 },
          { name: "Fri", sales: 2200 },
          { name: "Sat", sales: 2700 },
          { name: "Sun", sales: 1900 },
        ],
        weekly: [
          { name: "Week 1", sales: 900 },
          { name: "Week 2", sales: 1100 },
          { name: "Week 3", sales: 950 },
          { name: "Week 4", sales: 1200 },
        ],
        monthly: [
          { name: "Jan", sales: 1200 },
          { name: "Feb", sales: 900 },
          { name: "Mar", sales: 1500 },
          { name: "Apr", sales: 1100 },
          { name: "May", sales: 2100 },
          { name: "Jun", sales: 1700 },
          { name: "Jul", sales: 1900 },
          { name: "Aug", sales: 2200 },
          { name: "Sep", sales: 2500 },
          { name: "Oct", sales: 2000 },
          { name: "Nov", sales: 1600 },
          { name: "Dec", sales: 2400 },
        ],
      },
      revenueGraphData: {
        daily: [
          { name: "Mon", revenue: 2400 },
          { name: "Tue", revenue: 3000 },
          { name: "Wed", revenue: 3200 },
          { name: "Thu", revenue: 2900 },
          { name: "Fri", revenue: 4100 },
          { name: "Sat", revenue: 5000 },
          { name: "Sun", revenue: 3800 },
        ],
        weekly: [
          { name: "Week 1", revenue: 1500 },
          { name: "Week 2", revenue: 1800 },
          { name: "Week 3", revenue: 1700 },
          { name: "Week 4", revenue: 2000 },
        ],
        monthly: [
          { name: "Jan", revenue: 2200 },
          { name: "Feb", revenue: 1800 },
          { name: "Mar", revenue: 2600 },
          { name: "Apr", revenue: 2000 },
          { name: "May", revenue: 3200 },
          { name: "Jun", revenue: 2800 },
          { name: "Jul", revenue: 3000 },
          { name: "Aug", revenue: 3500 },
          { name: "Sep", revenue: 3800 },
          { name: "Oct", revenue: 3100 },
          { name: "Nov", revenue: 2600 },
          { name: "Dec", revenue: 4200 },
        ],
      },
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
