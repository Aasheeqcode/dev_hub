const express = require('express');
const router = express.Router();
const { createContest } = require('../controllers/contestController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this exists

router.post('/create', authMiddleware, createContest);

module.exports = router;