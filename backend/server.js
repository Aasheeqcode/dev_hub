const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http"); // <--- ADD THIS
const { Server } = require("socket.io"); // <--- ADD THIS

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: '*', // Allow ALL origins (Easiest fix for now)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
// --- ROUTES ---
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const contestRoutes = require('./routes/contestRoutes');
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", require("./routes/posts")); // <--- ADD THIS LINE
app.use('/api/contests', contestRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});