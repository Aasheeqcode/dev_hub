const Post = require("../models/Post");
const User = require("../models/User"); // Ensure you have this User model

/* CREATE */
exports.createPost = async (req, res) => {
  try {
    const { userId, title, description, picturePath, codeSnippet, language, postType } = req.body;
    const user = await User.findById(userId);
    
    const newPost = new Post({
      userId,
      name: user.name,
      userPicturePath: user.picturePath || "",
      userTitle: user.occupation || "Developer", // Fallback if occupation is missing
      title,
      description,
      picturePath,
      codeSnippet,
      language,
      postType,
      likes: {},
      comments: [],
    });

    await newPost.save();
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
exports.getFeedPosts = async (req, res) => {
  try {
    const { lang, type } = req.query;
    let filter = {};
    if (lang) filter.language = lang;
    if (type) filter.postType = type;

    const post = await Post.find(filter).sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.toggleSolvedStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    const post = await Post.findById(id);
    // Note: Assuming your Auth middleware adds req.user, you might want to check post.userId === req.user.id instead
    if (post.userId !== userId) {
      return res.status(403).json({ message: "Access Denied" });
    }

    post.isSolved = !post.isSolved;
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* COMMENTS */
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment, codeSnippet, language } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Fetch the Post
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = {
      userId,
      name: user.name || "Anonymous",
      userPicturePath: user.picturePath || "",
      comment,
      codeSnippet: codeSnippet || "",
      language: language || "text"
    };

    post.comments.unshift(newComment);
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    
    const commentIndex = post.comments.findIndex((c) => c._id.toString() === commentId);
    if (commentIndex === -1) return res.status(404).json({ message: "Comment not found" });

    if (post.comments[commentIndex].userId !== userId && post.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    post.comments.splice(commentIndex, 1);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};