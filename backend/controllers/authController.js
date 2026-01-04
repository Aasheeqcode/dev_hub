// backend/controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StreamClient } = require("@stream-io/node-sdk");

// Initialize Stream Client
// Ensure STREAM_API_KEY and STREAM_API_SECRET are in your .env file
const streamClient = new StreamClient(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

// --- REGISTER ---
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create User in MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // 4. Sync User to Stream Video (CRITICAL STEP)
    // We use the MongoDB _id as the unique ID for Stream
    await streamClient.upsertUsers([
      {
        id: user._id.toString(), 
        name: user.name,
        role: 'user', 
        // Optional: Add a default image if you want
        image: `https://getstream.io/random_png/?id=${user._id}&name=${user.name}` 
      },
    ]);

    // 5. Send Response
    res.status(201).json({ 
        message: "User registered successfully",
        user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// --- LOGIN ---
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find User
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. Sync Stream (Safety Check)
    // Updates the user in Stream just in case they were missed during registration
    await streamClient.upsertUsers([
      {
        id: user._id.toString(),
        name: user.name,
        role: 'user',
        image: `https://getstream.io/random_png/?id=${user._id}&name=${user.name}`
      },
    ]);

    // 5. Send Response
    // We send 'user' back so the frontend can save it to localStorage
    res.json({ 
        token,
        user: { 
            id: user._id.toString(), // Ensure ID is a string
            name: user.name, 
            email: user.email,
            image: `https://getstream.io/random_png/?id=${user._id}&name=${user.name}`
        } 
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// --- GET STREAM TOKEN ---
// This is called by the MeetPage to authenticate the video call
// backend/controllers/authController.js
// backend/controllers/authController.js

// backend/controllers/authController.js

// backend/controllers/authController.js

exports.getStreamToken = async (req, res) => {
  try {
    const userId = req.user.id; 
    
    if (!userId) return res.status(400).json({ message: "User ID missing" });

    // 1. Get your computer's current time (which is wrong/fast)
    const now = Math.floor(Date.now() / 1000);

    // 2. THE FIX: Subtract 24 HOURS (86400 seconds)
    // This makes the token created "yesterday" relative to your fast clock,
    // which puts it safely in the "past" for Stream's correct servers.
    const iat = now - 86400; 
    
    // 3. Set Expiration to 48 hours from now to ensure it stays valid
    const exp = now + (86400 * 2);

    const streamToken = streamClient.createToken(userId, exp, iat);
    
    console.log("--- CLOCK SKEW FIX APPLIED ---");
    console.log("Original Time:", now);
    console.log("Backdated iat:", iat);

    res.status(200).json({ token: streamToken });

  } catch (error) {
    console.error("Stream Token Error:", error);
    res.status(500).json({ message: "Failed to generate stream token" });
  }
};