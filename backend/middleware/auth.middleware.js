const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided");
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Received token from client:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token payload:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("Invalid token error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
