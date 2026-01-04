// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/users/profile
// Protected by authMiddleware
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // req.user.id comes from the token payload in your login controller
    const user = await User.findById(req.user.id);
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Exclude password from the result
    const { password, ...userData } = user._doc;
    
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;