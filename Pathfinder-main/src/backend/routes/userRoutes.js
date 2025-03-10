const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register a user
router.post("/register", async (req, res) => {
  try {
    console.log("Received registration request with data:", req.body);
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User with this email already exists", 
        success: false 
      });
    }
    
    // Create new user with password
    const user = new User({
      ...req.body,
      password: req.body.password || "defaultpassword123" // Use provided password or default
    });
    
    const savedUser = await user.save();
    console.log("✅ User successfully saved to MongoDB:", savedUser._id);
    
    // Generate JWT token
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );
    
    // Return success with token and user data (excluding password)
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;
    
    res.status(201).json({ 
      message: "User registered successfully", 
      user: userWithoutPassword,
      token,
      success: true 
    });
  } catch (error) {
    console.error("❌ Error saving user to MongoDB:", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );
    
    // Return success with token and user data (excluding password)
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    res.json({ 
      message: "Login successful", 
      user: userWithoutPassword,
      token,
      success: true 
    });
  } catch (error) {
    console.error("❌ Error logging in:", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    console.log("Fetching all users from MongoDB");
    const users = await User.find().select("-password"); // Exclude passwords
    console.log(`✅ Successfully retrieved ${users.length} users from MongoDB`);
    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users from MongoDB:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get a specific user
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
router.put("/users/:id", async (req, res) => {
  try {
    // Don't allow password updates through this route
    if (req.body.password) {
      delete req.body.password;
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 