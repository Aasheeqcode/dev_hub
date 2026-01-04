// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Public Routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected Route (Requires Login)
// The frontend will call this to get the video token
router.get("/stream-token", authMiddleware, authController.getStreamToken);

module.exports = router;