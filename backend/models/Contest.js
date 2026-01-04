const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [String], // Array of 4 strings
  correctOptionIndex: Number // 0-3
});

const ContestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['coding', 'hackathon', 'quiz', 'event'], 
    required: true 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  
  // Specific to Hackathons
  resourceLink: { type: String }, // Link to PDF or Repo

  // Specific to Quizzes
  questions: [QuestionSchema],
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contest', ContestSchema);