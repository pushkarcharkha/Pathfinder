import React, { useEffect, useState } from 'react';
import { User, BookOpen, Award, HelpCircle, CheckCircle, Calendar, Star, MessageSquare } from 'lucide-react';
import Logo from './Logo';

interface DashboardPageProps {
  username: string;
  onLogoClick: () => void;
  registrationStatus?: 'pending' | 'success' | 'error';
  registrationError?: string;
  userId?: string;
  industryPreference?: string[];
}

interface Mentor {
  _id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  expertise: string[];
  industries: string[];
  imageUrl: string;
  rating: number;
  availability: Array<{
    day: string;
    slots: string[];
  }>;
}

interface Meeting {
  _id: string;
  mentorId: Mentor;
  date: string;
  timeSlot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  topic: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ 
  username, 
  onLogoClick,
  registrationStatus,
  registrationError,
  userId,
  industryPreference = ['tech'] // Default to tech if no preference
}) => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingSlot, setMeetingSlot] = useState('');
  const [meetingTopic, setMeetingTopic] = useState('');

  // Fetch mentors based on user's industry preference
  useEffect(() => {
    console.log("Fetching mentors for industries:", industryPreference);
    setLoading(true);
    
    // Use the first industry preference to fetch mentors, or fetch all if not available
    const industry = industryPreference && industryPreference.length > 0 ? industryPreference[0] : null;
    const url = industry ? 
      `http://localhost:5000/api/mentors/industry/${industry}` : 
      'http://localhost:5000/api/mentors';
    
    console.log("Fetching mentors from URL:", url);
    
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched mentors:", data);
        if (data && data.length > 0) {
          setMentors(data);
        } else {
          // If no mentors found for specific industry, fetch all mentors
          console.log("No mentors found for industry, fetching all mentors");
          return fetch('http://localhost:5000/api/mentors');
        }
      })
      .then(res => {
        if (res) return res.json();
        return null;
      })
      .then(data => {
        if (data && data.length > 0) {
          console.log("Fetched all mentors as fallback:", data);
          setMentors(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching mentors:", err);
        setError(err.message);
        setLoading(false);
        
        // Fallback to empty array if the API call fails
        setMentors([]);
      });
  }, [industryPreference]);

  // Fetch user's meetings if userId is available
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/meetings/user/${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Fetched meetings:", data);
          setMeetings(data);
        })
        .catch((err) => {
          console.error("Error fetching meetings:", err);
        });
    }
  }, [userId]);

  const handleScheduleMeeting = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowMeetingModal(true);
  };

  const handleSubmitMeeting = () => {
    if (!selectedMentor || !meetingDate || !meetingSlot || !meetingTopic || !userId) {
      alert("Please fill all required fields");
      return;
    }

    const meetingData = {
      userId,
      mentorId: selectedMentor._id,
      date: new Date(meetingDate).toISOString(),
      timeSlot: meetingSlot,
      topic: meetingTopic,
      status: "scheduled",
      meetingLink: `https://meet.google.com/${Math.random().toString(36).substring(2, 10)}`
    };

    fetch('http://localhost:5000/api/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meetingData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Meeting scheduled:", data);
        setMeetings([...meetings, data]);
        setShowMeetingModal(false);
        setMeetingDate('');
        setMeetingSlot('');
        setMeetingTopic('');
        alert("Meeting scheduled successfully!");
      })
      .catch((err) => {
        console.error("Error scheduling meeting:", err);
        alert(`Error scheduling meeting: ${err.message}`);
      });
  };

  const navItems = [
    { icon: User, label: 'Profile' },
    { icon: BookOpen, label: 'Learning Path' },
    { icon: Award, label: 'Assessments' },
    { icon: HelpCircle, label: 'Help' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Logo onClick={onLogoClick} />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            PathFinder AI
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Registration Status Message */}
        {registrationStatus === 'success' && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center text-green-700">
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            <span>Your profile has been successfully saved to the database!</span>
          </div>
        )}
        
        {registrationStatus === 'error' && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center text-red-700">
            <span className="mr-2">⚠️</span>
            <span>There was an error saving your profile: {registrationError}</span>
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-6">
            Welcome back, {username}
          </h2>

          {/* Progress Tracker */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Course Progress</span>
                <span className="text-sm font-medium text-primary">60%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary w-[60%] transition-all duration-500"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Skills Mastered</span>
                <span className="text-sm font-medium text-primary">4/10</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary w-[40%] transition-all duration-500"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Assessments Completed</span>
                <span className="text-sm font-medium text-primary">2/5</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary w-[40%] transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Meetings */}
        {meetings.length > 0 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-6 flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-primary" />
              Upcoming Meetings
            </h2>
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting._id} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={meeting.mentorId.imageUrl} 
                      alt={meeting.mentorId.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{meeting.mentorId.name}</h3>
                      <p className="text-sm text-gray-600">{new Date(meeting.date).toLocaleDateString()} at {meeting.timeSlot}</p>
                      <p className="text-sm text-gray-600">Topic: {meeting.topic}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    meeting.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    meeting.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Mentors */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-medium text-gray-800 mb-6">
            Recommended Mentors for You
          </h2>
          {loading ? (
            <p className="text-gray-600">Loading mentors...</p>
          ) : error ? (
            <div className="text-red-600">Error: {error}</div>
          ) : mentors.length === 0 ? (
            <p className="text-gray-600">No mentors found for your interests</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <div key={mentor._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48">
                    <img 
                      src={mentor.imageUrl} 
                      alt={mentor.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{mentor.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{mentor.name}</h3>
                    <p className="text-gray-600 text-sm">{mentor.role} at {mentor.company}</p>
                    
                    <div className="mt-2 flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 3).map((skill, index) => (
                        <span key={index} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">{mentor.bio}</p>
                    
                    <button 
                      onClick={() => handleScheduleMeeting(mentor)}
                      className="mt-4 w-full bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-lg flex items-center justify-center"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Schedule Meeting
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Meeting Scheduling Modal */}
      {showMeetingModal && selectedMentor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Schedule Meeting with {selectedMentor.name}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                <select
                  value={meetingSlot}
                  onChange={(e) => setMeetingSlot(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select a time slot</option>
                  {selectedMentor.availability.flatMap(day => 
                    day.slots.map(slot => (
                      <option key={`${day.day}-${slot}`} value={slot}>
                        {day.day} - {slot}
                      </option>
                    ))
                  )}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <input
                  type="text"
                  value={meetingTopic}
                  onChange={(e) => setMeetingTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="What would you like to discuss?"
                  required
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowMeetingModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitMeeting}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
