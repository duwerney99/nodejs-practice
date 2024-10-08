const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    console.log("req ", req )
    const header = req.header("Authorization") || "";
    console.log("header ", header)
    const token = header.split(" ")[1];
    console.log("token ", token)
    if (!token) {
      return res.status(401).json({ message: "No provider token" });
    }
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("payload ", payload)
      req.username = payload.username;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalidate token" });
    }
  }

module.exports = verifyToken