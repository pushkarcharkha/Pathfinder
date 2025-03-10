const express = require("express");
const Mentor = require("../models/Mentor");
const Meeting = require("../models/Meeting");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Mentor Authentication
// Register a mentor (convert existing mentor to registered user)
router.post("/mentors/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if mentor exists
    let mentor = await Mentor.findOne({ email });
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found with this email" });
    }

    // Update mentor with password and set as registered
    mentor.password = password;
    mentor.isRegistered = true;
    await mentor.save();

    // Create token
    const token = mentor.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      mentor: {
        _id: mentor._id,
        name: mentor.name,
        email: mentor.email,
        role: mentor.role,
        company: mentor.company,
        imageUrl: mentor.imageUrl
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login mentor
router.post("/mentors/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide an email and password" });
    }

    // Check for mentor
    const mentor = await Mentor.findOne({ email });
    if (!mentor) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if mentor is registered
    if (!mentor.isRegistered) {
      return res.status(401).json({ message: "Mentor account not activated. Please register first." });
    }

    // Check if password matches
    const isMatch = await mentor.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = mentor.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      mentor: {
        _id: mentor._id,
        name: mentor.name,
        email: mentor.email,
        role: mentor.role,
        company: mentor.company,
        imageUrl: mentor.imageUrl
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({ message: "Not authorized to access this route" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.mentor = await Mentor.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized to access this route" });
  }
};

// Get all mentors
router.get("/mentors", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get mentors by industry
router.get("/mentors/industry/:industry", async (req, res) => {
  try {
    const mentors = await Mentor.find({ industries: req.params.industry });
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific mentor
router.get("/mentors/:id", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new mentor (admin only)
router.post("/mentors", async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Schedule a meeting with a mentor
router.post("/meetings", async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get meetings for a user
router.get("/meetings/user/:userId", async (req, res) => {
  try {
    const meetings = await Meeting.find({ userId: req.params.userId })
      .populate("mentorId", "name role imageUrl")
      .sort({ date: 1 });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get meetings for a mentor
router.get("/meetings/mentor/:mentorId", async (req, res) => {
  try {
    const meetings = await Meeting.find({ mentorId: req.params.mentorId })
      .populate("userId", "fullName email")
      .sort({ date: 1 });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update meeting status (protected route)
router.patch("/meetings/:id", protect, async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    
    // Check if the mentor is authorized to update this meeting
    if (meeting.mentorId.toString() !== req.mentor._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this meeting" });
    }
    
    // Update meeting status and notes if provided
    meeting.status = req.body.status || meeting.status;
    if (req.body.notes) {
      meeting.notes = req.body.notes;
    }
    if (req.body.meetingLink) {
      meeting.meetingLink = req.body.meetingLink;
    }
    
    await meeting.save();
    
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current mentor profile (protected route)
router.get("/mentors/me/profile", protect, async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.mentor._id);
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 