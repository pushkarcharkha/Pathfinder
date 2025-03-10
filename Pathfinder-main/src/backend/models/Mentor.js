const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mentorSchema = new mongoose.Schema({
  name: {
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
    required: function() {
      return this.isRegistered;
    },
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  bio: {
    type: String,
  },
  expertise: [String],
  industries: [String],
  imageUrl: {
    type: String,
    default: "https://img.freepik.com/free-photo/confident-business-woman-portrait-smiling-face_53876-137693.jpg"
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  availability: [{
    day: String,
    slots: [String]
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Encrypt password using bcrypt
mentorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Sign JWT and return
mentorSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
mentorSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor; 