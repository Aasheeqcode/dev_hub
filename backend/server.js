const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http"); // <--- ADD THIS
const { Server } = require("socket.io"); // <--- ADD THIS

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/posts")); // <--- ADD THIS LINE

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});