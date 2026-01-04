const express = require("express");
const { 
  getFeedPosts, 
  getUserPosts, 
  likePost, 
  createPost,
  toggleSolvedStatus,
  addComment,
  deleteComment
} = require("../controllers/posts");
// --- THE FIX IS HERE ---
// 1. Remove the curly braces { } because you used module.exports = ...
// 2. Use the variable name 'authMiddleware' to match your file
const authMiddleware = require("../middleware/authMiddleware"); 

const router = express.Router();

/* READ */
// Use 'authMiddleware' instead of 'verifyToken'
router.get("/", authMiddleware, getFeedPosts); 
router.get("/:userId/posts", authMiddleware, getUserPosts);

/* WRITE */
router.post("/", authMiddleware, createPost);

/* UPDATE */
router.patch("/:id/like", authMiddleware, likePost);
router.patch("/:id/solve", authMiddleware, toggleSolvedStatus);

/* COMMENTS */
router.post("/:id/comment", authMiddleware, addComment);
router.delete("/:id/comment/:commentId", authMiddleware, deleteComment);

module.exports = router;