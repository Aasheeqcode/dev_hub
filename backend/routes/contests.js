const express = require("express");
const { createContest, getContests } = require("../controllers/contests");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createContest);
router.get("/", authMiddleware, getContests);

module.exports = router;