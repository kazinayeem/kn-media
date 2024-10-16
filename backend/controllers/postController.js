const Post = require("../models/Post");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private (Requires JWT auth)
const createPost = async (req, res) => {
  const { text } = req.body;
  let image = "";
  console.log(req.body);

  try {
    // 1. Check if an image is uploaded
    if (req.file) {
      image = `/uploads/${req.file.filename}`; // Path where image is stored
    }

    // 2. Create the new post
    const newPost = new Post({
      text,
      imageUrl: image,
      author: req.user._id,
    });

    // 3. Save the post to the database
    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully!",
      post: savedPost,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create post",
        error: err.message,
      });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getAllPosts = async (req, res) => {
  try {
    // Fetch all posts and populate author details
    const posts = await Post.find().populate(
      "author",
      "username profilePicture"
    );
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch posts",
        error: err.message,
      });
  }
};

// @desc    Get a post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate(
      "author",
      "username profilePicture"
    );

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch post",
        error: err.message,
      });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private (Requires JWT auth, only author can update)
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  let image = "";

  try {
    // 1. Find the post by ID
    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // 2. Check if the user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to update this post",
        });
    }

    // 3. Handle image update if a new image is uploaded
    if (req.file) {
      // Delete the previous image if it exists
      if (post.image) {
        fs.unlinkSync(path.join(__dirname, "..", post.image));
      }
      image = `/uploads/${req.file.filename}`;
    }

    // 4. Update the post
    post.text = text || post.text;
    post.image = image || post.image;

    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update post",
        error: err.message,
      });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private (Requires JWT auth, only author can delete)
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Check if the user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to delete this post",
        });
    }

    // Delete the post's image if it exists
    if (post.image) {
      fs.unlinkSync(path.join(__dirname, "..", post.image));
    }

    await post.remove();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete post",
        error: err.message,
      });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
