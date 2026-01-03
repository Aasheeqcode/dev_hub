const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  description: { type: String },
  testCaseFile: { type: String }, // URL or Text content for now
  score: { type: Number }
});

const ContestSchema = new mongoose.Schema(
  {
    hostId: { type: String, required: true },
    hostName: { type: String, required: true },
    title: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["contest", "meet"], 
      required: true 
    },
    scope: { 
      type: String, 
      enum: ["public", "private", "custom"], 
      default: "public" 
    },
    allowedUsers: [String], // Array of UserIDs for 'custom' scope
    
    // Contest Specifics
    questions: [QuestionSchema],
    startTime: { type: Date, required: true },
    duration: { type: Number, required: true }, // In minutes
    
    // Status
    status: { 
      type: String, 
      enum: ["upcoming", "ongoing", "completed"], 
      default: "upcoming" 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contest", ContestSchema);