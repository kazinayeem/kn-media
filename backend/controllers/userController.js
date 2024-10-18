const User = require("../models/User"); // Import the User model
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists by email
    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } 
    );
    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token: `Bearer ${token}`, // Bearer token format
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = async (req, res, next) => {
  // Validate incoming request fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, bio, profilePictureUrl ,gender} = req.body;
 
  

  try {
    // Check if username or email already exists
    let existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username or email already exists." });
    }
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      gender,
      password: hashedPassword, 
      bio: bio || "",
      profilePictureUrl: profilePictureUrl,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        bio: newUser.bio,
        gender : newUser.gender,
        profilePictureUrl: newUser.profilePictureUrl,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Public
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Find user by ID and delete

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
