const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const skillSchema = new mongoose.Schema({
  name: String,
  rating: Number,
});

const certificateSchema = new mongoose.Schema({
  name: String,
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  education: {
    type: String,
  },
  fieldOfStudy: {
    type: String,
  },
  institution: {
    type: String,
  },
  certificates: [certificateSchema],
  technicalSkills: [skillSchema],
  softSkills: [skillSchema],
  desiredRoles: [String],
  industryPreference: [String],
  timeline: String,
  specificGoal: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User; 