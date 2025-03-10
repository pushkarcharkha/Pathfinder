import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  LogOut, 
  User, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ChevronRight,
  Briefcase,
  Building
} from 'lucide-react';

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

interface MentorDashboardProps {
  mentor: MentorData;
  meetings: Meeting[];
  loading: boolean;
  error: string | null;
  onViewMeeting: (meeting: Meeting) => void;
  onViewProfile: () => void;
  onLogout: () => void;
  onRefreshMeetings: () => void;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const cardVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02, 
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98, transition: { duration: 0.2 } }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.2 } }
};

const MentorDashboard: React.FC<MentorDashboardProps> = ({
  mentor,
  meetings,
  loading,
  error,
  onViewMeeting,
  onViewProfile,
  onLogout,
  onRefreshMeetings
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Handle refresh with animation
  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefreshMeetings();
    
    // Reset the animation after 1 second
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Auto-hide welcome message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter meetings based on search term and status filter
  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = 
      meeting.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.userId.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || meeting.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Group meetings by date
  const groupedMeetings: Record<string, Meeting[]> = {};
  
  filteredMeetings.forEach(meeting => {
    const date = new Date(meeting.date).toLocaleDateString();
    if (!groupedMeetings[date]) {
      groupedMeetings[date] = [];
    }
    groupedMeetings[date].push(meeting);
  });

  // Sort dates
  const sortedDates = Object.keys(groupedMeetings).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  // Calculate statistics
  const today = new Date().toLocaleDateString();
  const todayMeetings = groupedMeetings[today] || [];
  const upcomingMeetings = meetings.filter(m => 
    new Date(m.date) > new Date() && m.status === 'scheduled'
  );
  const totalMeetings = meetings.length;

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Calendar className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Welcome notification */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg bg-indigo-100 text-indigo-800 border-l-4 border-indigo-500"
          >
            <div className="flex items-center">
              <div className="mr-3">
                <motion.div 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <User className="h-6 w-6 text-indigo-600" />
                </motion.div>
              </div>
              <div>
                <p className="font-medium">Welcome back, {mentor.name.split(' ')[0]}!</p>
                <p className="text-sm">You have {upcomingMeetings.length} upcoming meetings</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <motion.div 
              className="mr-4 p-2 rounded-full bg-indigo-100"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <User className="h-8 w-8 text-indigo-600" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {mentor.name}
              </motion.h1>
              <motion.div 
                className="flex items-center text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Briefcase className="h-4 w-4 mr-1" />
                <span className="mr-3">{mentor.role}</span>
                <Building className="h-4 w-4 mr-1" />
                <span>{mentor.company}</span>
              </motion.div>
            </div>
          </div>
          <div className="flex space-x-2">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={onViewProfile}
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors flex items-center"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={onLogout}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <motion.div 
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Today's Meetings</p>
                <p className="text-2xl font-bold">{todayMeetings.length}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 mr-4">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming Meetings</p>
                <p className="text-2xl font-bold">{upcomingMeetings.length}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Meetings</p>
                <p className="text-2xl font-bold">{totalMeetings}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="Search meetings by topic or student name"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500 mr-2">Status:</span>
              </div>
              
              <div className="flex space-x-2">
                {['all', 'scheduled', 'completed', 'cancelled'].map((status) => (
                  <motion.button
                    key={status}
                    onClick={() => setStatusFilter(status as any)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusFilter === status 
                        ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300' 
                        : 'bg-gray-100 text-gray-800 border-2 border-transparent'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </motion.button>
                ))}
              </div>
              
              <motion.button
                onClick={handleRefresh}
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Meetings List */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-6 border-b border-gray-200">
            <motion.h2 variants={itemVariants} className="text-xl font-semibold text-gray-800">
              Your Meetings
            </motion.h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent mb-4"></div>
                <p className="text-gray-500">Loading your meetings...</p>
              </div>
            ) : filteredMeetings.length === 0 ? (
              <div className="p-8 text-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block p-3 rounded-full bg-gray-100 mb-4"
                >
                  <Calendar className="h-8 w-8 text-gray-400" />
                </motion.div>
                <p className="text-gray-500">No meetings found</p>
                {searchTerm || statusFilter !== 'all' ? (
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
                ) : null}
              </div>
            ) : (
              <>
                {sortedDates.map(date => (
                  <div key={date} className="py-4 px-6">
                    <motion.h3 
                      variants={itemVariants}
                      className="text-sm font-medium text-gray-500 mb-4"
                    >
                      {new Date(date).toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </motion.h3>
                    
                    <div className="space-y-4">
                      {groupedMeetings[date].map(meeting => (
                        <motion.div
                          key={meeting._id}
                          variants={cardVariants}
                          initial="initial"
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => onViewMeeting(meeting)}
                          className="p-4 bg-gray-50 rounded-lg cursor-pointer border border-gray-100 hover:border-indigo-200 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center mb-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(meeting.status)}`}>
                                  {getStatusIcon(meeting.status)}
                                  <span className="ml-1">{meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}</span>
                                </span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-500">{meeting.timeSlot}</span>
                              </div>
                              <h4 className="font-medium text-gray-900">{meeting.topic}</h4>
                              <p className="text-sm text-gray-500">with {meeting.userId.fullName}</p>
                            </div>
                            <div className="flex items-center text-indigo-500">
                              <span className="text-sm mr-1">View Details</span>
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default MentorDashboard; 