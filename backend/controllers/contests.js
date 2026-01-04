const Contest = require("../models/Contest");
const User = require("../models/User");

/* CREATE CONTEST / MEET */
exports.createContest = async (req, res) => {
  try {
    const { 
      userId, title, type, scope, allowedUsers, 
      startTime, duration, questions 
    } = req.body;

    const user = await User.findById(userId);
    
    const newContest = new Contest({
      hostId: userId,
      hostName: user.name,
      title,
      type,
      scope,
      allowedUsers: allowedUsers || [],
      startTime: new Date(startTime),
      duration: parseInt(duration),
      questions: type === "contest" ? questions : [],
      status: "upcoming" // Default
    });

    await newContest.save();
    res.status(201).json(newContest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET CONTESTS (Separate Ongoing vs Upcoming) */
exports.getContests = async (req, res) => {
  try {
    const now = new Date();
    
    // Find Upcoming
    const upcoming = await Contest.find({ 
      startTime: { $gt: now } 
    }).sort({ startTime: 1 });

    // Find Ongoing (Start Time was in past, but (Start + Duration) is in future)
    // This is a simplified check; usually you run a cron job to update status
    const ongoing = await Contest.find({
      startTime: { $lte: now },
      // Logic: If (startTime + duration) > now, it is ongoing. 
      // For simplicity in this demo, we check the 'status' field or raw date math.
      // Let's stick to status 'ongoing' if you update it manually, 
      // or filter in JS for simplicity:
    });

    res.status(200).json({ upcoming, ongoing });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};