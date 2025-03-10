# Mentor Portal

The Mentor Portal is a dedicated interface for mentors to manage their interactions with students on the Pathfinder platform.

## Features

### 1. Mentor Authentication
- **Login**: Secure login for registered mentors
- **Registration**: Ability for mentors to register and create an account

### 2. Dashboard
- **Meeting Overview**: View all scheduled, completed, and cancelled meetings
- **Meeting Statistics**: Quick summary of today's meetings, upcoming meetings, and total meetings
- **Search & Filter**: Easily find specific meetings by searching or filtering by status

### 3. Meeting Management
- **View Meeting Details**: See comprehensive information about each meeting
- **Update Meeting Status**: Mark meetings as completed or cancelled
- **Add Notes**: Document important points from the meeting
- **Provide Meeting Links**: Add video conferencing links for virtual meetings

### 4. Profile Management
- **View Profile**: See your mentor profile as it appears to students
- **Bio & Expertise**: View your professional information, expertise, and industries

## Technical Implementation

The Mentor Portal is built using:
- React for the frontend
- TypeScript for type safety
- Tailwind CSS for styling
- Lucide React for icons
- RESTful API integration with the backend

## Components Structure

```
mentor-portal/
├── MentorApp.tsx            # Main application component
├── components/
│   ├── MentorLogin.tsx      # Login interface
│   ├── MentorDashboard.tsx  # Dashboard with meeting list
│   ├── MeetingDetails.tsx   # Detailed view of a meeting
│   └── MentorProfile.tsx    # Mentor profile view
└── README.md                # Documentation
```

## API Endpoints

The portal interacts with the following API endpoints:

- `POST /api/mentors/login` - Authenticate mentor
- `GET /api/meetings/mentor/:mentorId` - Get all meetings for a mentor
- `PATCH /api/meetings/:id` - Update meeting status
- `GET /api/mentors/me/profile` - Get current mentor profile

## Getting Started

To use the Mentor Portal:

1. Navigate to the main application
2. Click on "Mentor Portal" in the navigation
3. Log in with your mentor credentials
4. Manage your meetings and profile

## Future Enhancements

- Calendar view for meetings
- Direct messaging with students
- Ability to update availability
- Analytics on mentoring sessions 