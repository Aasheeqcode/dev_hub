// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1. Get token from header
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).json({ message: "Access Denied: No token provided" });
    }

    // 2. Remove "Bearer " prefix if present (CRITICAL FIX)
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // 3. Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach user info (id, role) to request
    req.user = verified;
    next();
    
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;