const Contest = require('../models/Contest');

exports.createContest = async (req, res) => {
  try {
    const { title, description, type, startDate, endDate, questions, resourceLink } = req.body;

    // Basic Validation
    if (!title || !description || !startDate || !endDate) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    const newContest = new Contest({
      title,
      description,
      type,
      startDate,
      endDate,
      questions: type === 'quiz' ? questions : [],
      resourceLink: type === 'hackathon' ? resourceLink : '',
      createdBy: req.user.id // Assumes you have auth middleware adding req.user
    });

    await newContest.save();

    res.status(201).json({ message: "Contest created successfully!", contest: newContest });
  } catch (error) {
    console.error("Create Contest Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};