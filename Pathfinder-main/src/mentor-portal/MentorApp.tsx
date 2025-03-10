import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MentorLogin from './components/MentorLogin';
import MentorRegistration from './components/MentorRegistration';
import MentorDashboard from './components/MentorDashboard';
import MentorProfile from './components/MentorProfile';
import MeetingDetails from './components/MeetingDetails';

type MentorPage = 'login' | 'register' | 'dashboard' | 'profile' | 'meeting-details';

interface MentorData {
  _id: string;
  name: string;
  email: string;
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
  token?: string;
}

interface Meeting {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
  };
  mentorId: string;
  date: string;
  timeSlot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  topic: string;
  notes?: string;
  meetingLink?: string;
}

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

const MentorApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<MentorPage>('login');
  const [mentor, setMentor] = useState<MentorData | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  // Check if mentor is already logged in
  useEffect(() => {
    const storedMentor = localStorage.getItem('mentor');
    if (storedMentor) {
      try {
        const parsedMentor = JSON.parse(storedMentor);
        setMentor(parsedMentor);
        setCurrentPage('dashboard');
        fetchMeetings(parsedMentor._id, parsedMentor.token);
      } catch (err) {
        console.error('Error parsing stored mentor data:', err);
        localStorage.removeItem('mentor');
      }
    }
  }, []);

  const fetchMeetings = async (mentorId: string, token?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:5000/api/meetings/mentor/${mentorId}`, {
        headers: {
          'Authorization': `Bearer ${token || mentor?.token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch meetings');
      }
      
      const data = await response.json();
      setMeetings(data);
    } catch (err) {
      console.error('Error fetching meetings:', err);
      setError('Failed to load meetings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/mentors/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Store mentor data with token
      const mentorData = {
        ...data.mentor,
        token: data.token,
      };
      
      setMentor(mentorData);
      localStorage.setItem('mentor', JSON.stringify(mentorData));
      
      // Show success notification
      showNotification('Login successful! Welcome back.', 'success');
      
      // Fetch meetings for the mentor
      await fetchMeetings(mentorData._id, mentorData.token);
      
      // Navigate to dashboard
      setCurrentPage('dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/mentors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await response.json();
      
      // Store mentor data with token
      const mentorData = {
        ...data.mentor,
        token: data.token,
      };
      
      setMentor(mentorData);
      localStorage.setItem('mentor', JSON.stringify(mentorData));
      
      // Show success notification
      showNotification('Registration successful! Welcome to the mentor portal.', 'success');
      
      // Fetch meetings for the mentor
      await fetchMeetings(mentorData._id, mentorData.token);
      
      // Navigate to dashboard
      setCurrentPage('dashboard');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setMentor(null);
    setMeetings([]);
    localStorage.removeItem('mentor');
    showNotification('You have been logged out successfully.', 'info');
    setCurrentPage('login');
  };

  const handleViewMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setCurrentPage('meeting-details');
  };

  const handleUpdateMeetingStatus = async (meetingId: string, status: 'scheduled' | 'completed' | 'cancelled') => {
    if (!mentor?.token) {
      setError('Authentication required');
      return false;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/meetings/${meetingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mentor.token}`,
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update meeting status');
      }
      
      // Update the meeting in the local state
      setMeetings(prevMeetings => 
        prevMeetings.map(meeting => 
          meeting._id === meetingId ? { ...meeting, status } : meeting
        )
      );
      
      // If we're viewing a meeting, update the selected meeting too
      if (selectedMeeting && selectedMeeting._id === meetingId) {
        setSelectedMeeting({ ...selectedMeeting, status });
      }
      
      // Show success notification
      const statusText = status.charAt(0).toUpperCase() + status.slice(1);
      showNotification(`Meeting ${statusText} successfully!`, 'success');
      
      return true;
    } catch (err) {
      console.error('Error updating meeting status:', err);
      setError('Failed to update meeting status');
      return false;
    }
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 
              notification.type === 'error' ? 'bg-red-100 text-red-800 border-l-4 border-red-500' : 
              'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPage === 'login' && (
          <motion.div
            key="login"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="w-full min-h-screen"
          >
            <MentorLogin 
              onLogin={handleLogin}
              loading={loading}
              error={error}
              onRegister={() => setCurrentPage('register')}
            />
          </motion.div>
        )}

        {currentPage === 'register' && (
          <motion.div
            key="register"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="w-full min-h-screen"
          >
            <MentorRegistration
              onRegister={handleRegister}
              onBack={() => setCurrentPage('login')}
              loading={loading}
              error={error}
            />
          </motion.div>
        )}

        {currentPage === 'dashboard' && mentor && (
          <motion.div
            key="dashboard"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="w-full min-h-screen"
          >
            <MentorDashboard 
              mentor={mentor}
              meetings={meetings}
              loading={loading}
              error={error}
              onViewMeeting={handleViewMeeting}
              onViewProfile={() => setCurrentPage('profile')}
              onLogout={handleLogout}
              onRefreshMeetings={() => fetchMeetings(mentor._id)}
            />
          </motion.div>
        )}

        {currentPage === 'profile' && mentor && (
          <motion.div
            key="profile"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="w-full min-h-screen"
          >
            <MentorProfile 
              mentor={mentor}
              onBack={() => setCurrentPage('dashboard')}
              onLogout={handleLogout}
            />
          </motion.div>
        )}

        {currentPage === 'meeting-details' && selectedMeeting && (
          <motion.div
            key="meeting-details"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="w-full min-h-screen"
          >
            <MeetingDetails 
              meeting={selectedMeeting}
              onBack={() => setCurrentPage('dashboard')}
              onUpdateStatus={handleUpdateMeetingStatus}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorApp; 