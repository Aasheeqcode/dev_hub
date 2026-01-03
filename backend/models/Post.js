const mongoose = require("mongoose");

// 1. Comment Schema
const CommentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    userPicturePath: String,
    comment: { type: String, required: true },
    codeSnippet: { type: String, default: "" },
    language: { type: String, default: "text" }
  },
  { timestamps: true }
);

// 2. Post Schema
const PostSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    userPicturePath: String,
    userTitle: { type: String, default: "Developer" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    picturePath: { type: String, default: "" },
    codeSnippet: { type: String, default: "" },
    language: { 
      type: String, 
      default: "text",
      enum: ["text", "javascript", "python", "java", "cpp", "csharp", "go", "rust", "sql", "typescript"] 
    },
    postType: {
      type: String,
      default: "general",
      enum: ["general", "question", "showcase", "discussion"]
    },
    isSolved: { type: Boolean, default: false },
    likes: { type: Map, of: Boolean },
    comments: [CommentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);