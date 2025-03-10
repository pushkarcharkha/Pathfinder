const mongoose = require("mongoose");
const Mentor = require("./models/Mentor");
require("dotenv").config();

const mentors = [
  {
    name: "Alex Chen",
    email: "alex.chen@example.com",
    role: "Senior Software Engineer",
    company: "Google",
    bio: "10+ years of experience in software development with expertise in AI and machine learning.",
    expertise: ["JavaScript", "Python", "Machine Learning", "AI", "Cloud Computing"],
    industries: ["tech", "education"],
    imageUrl: "https://img.freepik.com/free-photo/young-businessman-using-laptop-computer_1303-16971.jpg",
    rating: 4.9,
    availability: [
      { day: "Monday", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
      { day: "Wednesday", slots: ["11:00 AM", "3:00 PM", "5:00 PM"] },
      { day: "Friday", slots: ["9:00 AM", "1:00 PM", "3:00 PM"] }
    ]
  },
  {
    name: "Sarah Kim",
    email: "sarah.kim@example.com",
    role: "Design Director",
    company: "Spotify",
    bio: "Creative design leader with a passion for user experience and brand identity.",
    expertise: ["UX Design", "UI Design", "Brand Strategy", "Product Design", "Design Systems"],
    industries: ["tech", "retail"],
    imageUrl: "https://img.freepik.com/free-photo/creative-designer-working-studio_23-2149285841.jpg",
    rating: 4.8,
    availability: [
      { day: "Tuesday", slots: ["10:00 AM", "1:00 PM", "4:00 PM"] },
      { day: "Thursday", slots: ["11:00 AM", "2:00 PM", "5:00 PM"] },
      { day: "Friday", slots: ["9:00 AM", "12:00 PM", "3:00 PM"] }
    ]
  },
  {
    name: "Marcus Johnson",
    email: "marcus.johnson@example.com",
    role: "Startup Founder & Advisor",
    company: "TechVentures",
    bio: "Serial entrepreneur with multiple successful exits. Passionate about helping new founders.",
    expertise: ["Entrepreneurship", "Business Strategy", "Fundraising", "Marketing", "Leadership"],
    industries: ["tech", "finance", "healthcare"],
    imageUrl: "https://img.freepik.com/free-photo/confident-business-woman-portrait-smiling-face_53876-137693.jpg",
    rating: 4.7,
    availability: [
      { day: "Monday", slots: ["9:00 AM", "1:00 PM", "5:00 PM"] },
      { day: "Wednesday", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
      { day: "Thursday", slots: ["11:00 AM", "3:00 PM", "5:00 PM"] }
    ]
  },
  {
    name: "Priya Patel",
    email: "priya.patel@example.com",
    role: "Data Science Manager",
    company: "Netflix",
    bio: "Data scientist with expertise in big data and analytics. Helping students break into the field.",
    expertise: ["Data Science", "Python", "Machine Learning", "Big Data", "Statistics"],
    industries: ["tech", "education", "entertainment"],
    imageUrl: "https://img.freepik.com/free-photo/young-beautiful-woman-smart-casual-wear-glasses-holding-laptop-smiling-confident_176420-11094.jpg",
    rating: 4.9,
    availability: [
      { day: "Tuesday", slots: ["9:00 AM", "11:00 AM", "3:00 PM"] },
      { day: "Thursday", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
      { day: "Friday", slots: ["12:00 PM", "2:00 PM", "5:00 PM"] }
    ]
  },
  {
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "Healthcare Consultant",
    company: "MedTech Solutions",
    bio: "Healthcare professional with a background in technology implementation and digital health.",
    expertise: ["Healthcare IT", "Digital Health", "Project Management", "Regulatory Compliance"],
    industries: ["healthcare", "tech"],
    imageUrl: "https://img.freepik.com/free-photo/portrait-smiling-young-doctor-healthcare-medicine-concept_53876-146667.jpg",
    rating: 4.6,
    availability: [
      { day: "Monday", slots: ["11:00 AM", "2:00 PM", "4:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM", "1:00 PM", "5:00 PM"] },
      { day: "Friday", slots: ["10:00 AM", "12:00 PM", "3:00 PM"] }
    ]
  },
  {
    name: "Michael Rodriguez",
    email: "michael.rodriguez@example.com",
    role: "Manufacturing Operations Director",
    company: "Tesla",
    bio: "Expert in advanced manufacturing processes and Industry 4.0 technologies with 15+ years of experience.",
    expertise: ["Manufacturing Operations", "Supply Chain", "Lean Manufacturing", "Automation", "Industry 4.0"],
    industries: ["manufacturing", "tech", "automotive"],
    imageUrl: "https://img.freepik.com/free-photo/engineer-working-factory_23-2148334556.jpg",
    rating: 4.8,
    availability: [
      { day: "Monday", slots: ["8:00 AM", "1:00 PM", "4:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM", "2:00 PM", "5:00 PM"] },
      { day: "Thursday", slots: ["10:00 AM", "3:00 PM", "6:00 PM"] }
    ]
  },
  {
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    role: "Quality Control Manager",
    company: "Boeing",
    bio: "Specialized in quality assurance and process improvement in manufacturing environments.",
    expertise: ["Quality Control", "Six Sigma", "Process Improvement", "Regulatory Compliance", "Team Leadership"],
    industries: ["manufacturing", "aerospace"],
    imageUrl: "https://img.freepik.com/free-photo/female-engineer-factory-with-tablet_23-2148334540.jpg",
    rating: 4.7,
    availability: [
      { day: "Tuesday", slots: ["9:00 AM", "11:00 AM", "3:00 PM"] },
      { day: "Thursday", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
      { day: "Friday", slots: ["8:00 AM", "12:00 PM", "2:00 PM"] }
    ]
  }
];

const seedMentors = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    // Delete existing mentors
    await Mentor.deleteMany({});
    console.log("Deleted existing mentors");

    // Insert new mentors
    await Mentor.insertMany(mentors);
    console.log("Added new mentors successfully");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("MongoDB disconnected");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding mentors:", error);
    process.exit(1);
  }
};

seedMentors(); 