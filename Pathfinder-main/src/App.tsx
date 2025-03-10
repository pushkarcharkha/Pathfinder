import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Search,
  Brain,
  Target,
  Calendar,
  Users,
  Star,
  MessageSquare,
  Zap,
  Menu,
  ArrowRight,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

// Import components
import AuthPage from './components/AuthPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import ProfileSetupPage from './components/ProfileSetupPage';
import EducationSetupPage from './components/EducationSetupPage';
import SkillsSetupPage from './components/SkillsSetupPage';
import CareerGoalsPage from './components/CareerGoalsPage';
import LoadingPage from './components/LoadingPage';
import DashboardPage from './components/DashboardPage';
import MentorApp from './mentor-portal/MentorApp';

// Import image constants
import {
  FEATURE_IMAGES,
  HERO_IMAGES,
  MENTOR_IMAGES,
  FALLBACK_IMAGES,
} from './assets/images';

// Image URLs
const MENTOR_IMAGE = HERO_IMAGES.MENTOR;
const STUDENT_IMAGE = HERO_IMAGES.STUDENT;
const DECORATION_IMAGE = HERO_IMAGES.DECORATION;

// Fallback image URLs
const FALLBACK_MENTOR_IMAGE = FALLBACK_IMAGES.MENTOR;
const FALLBACK_STUDENT_IMAGE = FALLBACK_IMAGES.STUDENT;
const FALLBACK_DECORATION = FALLBACK_IMAGES.DECORATION;

// Types
interface ImageLoadError {
  mentor: boolean;
  student: boolean;
  decoration: boolean;
}

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  gradient: string;
  illustration: string;
}

interface Mentor {
  name: string;
  role: string;
  image: string;
  tags: string[];
}

interface Skill {
  name: string;
  rating: number;
}

type Page = 'main' | 'auth' | 'login' | 'signup' | 'profile' | 'profile-setup' | 'education-setup' | 'skills-setup' | 'career-goals' | 'loading' | 'dashboard' | 'settings' | 'invite-friends' | 'help' | 'mentor-portal';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.2 } }
};

const cardVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98, transition: { duration: 0.2 } }
};

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [imageLoadError, setImageLoadError] = useState<ImageLoadError>({
    mentor: false,
    student: false,
    decoration: false
  });
  const [profileData, setProfileData] = useState({
    fullName: 'Test User',
    email: 'test@example.com',
    age: '25',
    profileImage: undefined as File | undefined,
    education: 'Bachelor',
    fieldOfStudy: 'Computer Science',
    institution: 'Test University',
    certificates: [] as Array<{ name: string; file?: File }>,
    technicalSkills: [] as Skill[],
    softSkills: [] as Skill[],
    desiredRoles: [] as string[],
    industryPreference: [] as string[],
    timeline: '',
    specificGoal: '',
    registrationStatus: 'pending' as 'pending' | 'success' | 'error',
    registrationError: '' as string,
    _id: '' as string,
    password: '',
    token: '' as string,
  });

  useEffect(() => {
    // Simulate initial load to ensure everything is mounted
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  const handleImageError = (imageType: keyof ImageLoadError): void => {
    setImageLoadError(prev => ({
      ...prev,
      [imageType]: true
    }));
  };

  const handleLogoClick = () => {
    // If user is logged in (has profile data), go to dashboard
    // Otherwise, go to auth page
    if (profileData.fullName) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('auth');
    }
  };

  const handleLogin = (username: string, password: string) => {
    // Here you would typically make an API call to authenticate the user
    console.log('Login attempt:', { username, password });
    // For now, we'll just go to the profile page
    setCurrentPage('profile');
  };

  const handleLogout = () => {
    setCurrentPage('main');
  };

  const handleSignup = (username: string, password: string) => {
    // Store the credentials for later use
    setProfileData(prev => ({
      ...prev,
      email: username,
      password: password // Store password for registration
    }));
    
    // Go to profile setup page
    setCurrentPage('profile-setup');
  };

  const handleProfileSetup = (data: {
    fullName: string;
    email: string;
    age: string;
    profileImage?: File;
  }) => {
    setProfileData(prev => ({
      ...prev,
      ...data
    }));
    setCurrentPage('education-setup');
  };

  const handleEducationSetup = (data: {
    education: string;
    fieldOfStudy: string;
    institution: string;
    certificates: Array<{ name: string; file?: File }>;
  }) => {
    setProfileData(prev => ({
      ...prev,
      ...data
    }));
    setCurrentPage('skills-setup');
  };

  const handleSkillsSetup = (data: {
    technicalSkills: Skill[];
    softSkills: Skill[];
  }) => {
    setProfileData(prev => ({
      ...prev,
      ...data
    }));
    setCurrentPage('career-goals');
  };

  const handleCareerGoalsComplete = (data: {
    desiredRoles: string[];
    industryPreference: string[];
    timeline: string;
    specificGoal: string;
  }) => {
    // Update local state with the new data
    const updatedProfileData = {
      ...profileData,
      ...data,
      registrationStatus: 'pending' as 'pending' | 'success' | 'error'
    };
    
    setProfileData(updatedProfileData);
    
    // Immediately transition to loading page
    setCurrentPage('loading');
    
    // Create a clean object for MongoDB without frontend-specific fields
    const dataToSend = {
      fullName: updatedProfileData.fullName,
      email: updatedProfileData.email,
      password: updatedProfileData.password, // Include password for authentication
      age: updatedProfileData.age,
      education: updatedProfileData.education,
      fieldOfStudy: updatedProfileData.fieldOfStudy,
      institution: updatedProfileData.institution,
      certificates: updatedProfileData.certificates,
      technicalSkills: updatedProfileData.technicalSkills,
      softSkills: updatedProfileData.softSkills,
      desiredRoles: updatedProfileData.desiredRoles,
      industryPreference: updatedProfileData.industryPreference,
      timeline: updatedProfileData.timeline,
      specificGoal: updatedProfileData.specificGoal
    };
    
    // Send the complete profile data to the backend in the background
    console.log('Sending profile data to backend:', dataToSend);
    
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Profile registered successfully:', data);
        // Update profile data with registration status and token
        setProfileData(prev => ({
          ...prev,
          registrationStatus: 'success' as 'success',
          _id: data.user._id, // Store the MongoDB ID
          token: data.token // Store the authentication token
        }));
      })
      .catch(error => {
        console.error('Error registering profile:', error);
        // Update profile data with registration status
        setProfileData(prev => ({
          ...prev,
          registrationStatus: 'error' as 'error',
          registrationError: error.message
        }));
      });
  };

  // Add a login function that uses the authentication API
  const handleLoginSubmit = (email: string, password: string) => {
    console.log('Attempting login with:', { email, password });
    
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Login successful:', data);
        
        // Update profile data with user info and token
        setProfileData({
          ...profileData,
          ...data.user,
          token: data.token,
          // Ensure these fields are set even if not returned from API
          _id: data.user._id || '',
          industryPreference: data.user.industryPreference || ['tech']
        });
        
        // Navigate to dashboard
        setCurrentPage('dashboard');
      })
      .catch(error => {
        console.error('Login error:', error);
        alert(`Login failed: ${error.message}`);
      });
  };

  const handleLoadingComplete = () => {
    // Check if we have a registration status to show a message on the dashboard
    console.log("Loading complete, transitioning to dashboard with status:", profileData.registrationStatus);
    setCurrentPage('dashboard');
  };

  const features: Feature[] = [
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: 'Expert Mentors',
      description: "Connect with industry leaders who've walked the path before you.",
      gradient: 'from-rose-400 to-rose-600',
      illustration: FEATURE_IMAGES.EXPERT_MENTORS,
    },
    {
      icon: <Calendar className="h-6 w-6 text-white" />,
      title: 'Flexible Schedule',
      description: 'Book sessions that align perfectly with your timeline.',
      gradient: 'from-fuchsia-400 to-fuchsia-600',
      illustration: FEATURE_IMAGES.FLEXIBLE_SCHEDULE,
    },
    {
      icon: <Target className="h-6 w-6 text-white" />,
      title: 'Personalized Path',
      description: 'Custom guidance tailored to your unique goals and aspirations.',
      gradient: 'from-violet-400 to-violet-600',
      illustration: FEATURE_IMAGES.PERSONALIZED_PATH,
    },
  ];

  const mentors: Mentor[] = [
    {
      name: 'Alex Chen',
      role: 'Senior Engineer at Google',
      image: MENTOR_IMAGES.TECH_MENTOR,
      tags: ['Engineering', 'AI', 'Leadership'],
    },
    {
      name: 'Sarah Kim',
      role: 'Design Director at Spotify',
      image: MENTOR_IMAGES.DESIGN_MENTOR,
      tags: ['Design', 'UX', 'Brand'],
    },
    {
      name: 'Marcus Johnson',
      role: 'Startup Founder & Advisor',
      image: MENTOR_IMAGES.BUSINESS_MENTOR,
      tags: ['Startup', 'Growth', 'Strategy'],
    },
  ];

  // Render the appropriate page based on currentPage state
  if (currentPage === 'auth') {
    return (
      <AuthPage
        onLoginClick={() => setCurrentPage('login')}
        onSignupClick={() => setCurrentPage('signup')}
        onLogoClick={handleLogoClick}
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <LoginPage
        onBack={() => setCurrentPage('auth')}
        onLogin={handleLoginSubmit}
        onCreateAccount={() => setCurrentPage('signup')}
        onLogoClick={handleLogoClick}
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <SignupPage
        onBack={() => setCurrentPage('auth')}
        onSignup={handleSignup}
        onLogoClick={handleLogoClick}
      />
    );
  }

  if (currentPage === 'profile-setup') {
    return (
      <ProfileSetupPage 
        onNext={handleProfileSetup}
        onLogoClick={handleLogoClick}
      />
    );
  }

  if (currentPage === 'education-setup') {
    return (
      <EducationSetupPage 
        onNext={handleEducationSetup}
        onBack={() => setCurrentPage('profile-setup')}
        onLogoClick={handleLogoClick}
      />
    );
  }

  if (currentPage === 'skills-setup') {
    return (
      <SkillsSetupPage 
        onNext={handleSkillsSetup}
        onBack={() => setCurrentPage('education-setup')}
        onLogoClick={handleLogoClick}
      />
    );
  }

  if (currentPage === 'career-goals') {
    return (
      <CareerGoalsPage 
        onComplete={handleCareerGoalsComplete}
        onBack={() => setCurrentPage('skills-setup')}
      />
    );
  }

  if (currentPage === 'loading') {
    console.log("Rendering loading page");
    return (
      <LoadingPage 
        onComplete={handleLoadingComplete}
        onLogoClick={handleLogoClick}
      />
    );
  }

  if (currentPage === 'dashboard') {
    console.log("Rendering dashboard page with:", {
      username: profileData.fullName,
      userId: profileData._id,
      industryPreference: profileData.industryPreference
    });
    return (
      <DashboardPage 
        username={profileData.fullName.split(' ')[0] || "User"}
        onLogoClick={handleLogoClick}
        registrationStatus={profileData.registrationStatus}
        registrationError={profileData.registrationError}
        userId={profileData._id}
        industryPreference={profileData.industryPreference || ['tech']}
      />
    );
  }

  if (currentPage === 'mentor-portal') {
    return <MentorApp />;
  }

  if (currentPage === 'profile') {
    return (
      <ProfilePage
        onLogout={handleLogout}
        onLogoClick={handleLogoClick}
        onNavigate={setCurrentPage}
      />
    );
  }

  // Main landing page
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Navigation */}
        <motion.nav 
          className="glass-effect sticky top-0 z-50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="navigation" 
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Brain className="h-8 w-8 text-primary animate-float" aria-hidden="true" />
                <span className="ml-2 text-xl font-bold gradient-text">
                  mentor.me
                </span>
              </motion.div>
              
              {/* Mobile menu button */}
              <motion.button 
                className="md:hidden p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </motion.button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <motion.a
                  href="#"
                  className="text-gray-700 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  role="menuitem"
                >
                  Find Mentors
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-700 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  role="menuitem"
                >
                  Resources
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-700 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  role="menuitem"
                >
                  Stories
                </motion.a>
                <motion.button 
                  onClick={() => setCurrentPage('auth')}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-primary/90 text-white px-6 py-2 rounded-full hover:bg-primary transition-all duration-300"
                  aria-label="Get Started"
                >
                  Get Started
                </motion.button>
                <motion.button 
                  onClick={() => setCurrentPage('mentor-portal')}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-secondary/90 text-white px-6 py-2 rounded-full hover:bg-secondary transition-all duration-300"
                  aria-label="Mentor Portal"
                >
                  Mentor Portal
                </motion.button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  className="md:hidden py-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="flex flex-col space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.a
                      href="#"
                      className="text-gray-700 hover:text-primary transition-colors"
                      variants={itemVariants}
                      role="menuitem"
                    >
                      Find Mentors
                    </motion.a>
                    <motion.a
                      href="#"
                      className="text-gray-700 hover:text-primary transition-colors"
                      variants={itemVariants}
                      role="menuitem"
                    >
                      Resources
                    </motion.a>
                    <motion.a
                      href="#"
                      className="text-gray-700 hover:text-primary transition-colors"
                      variants={itemVariants}
                      role="menuitem"
                    >
                      Stories
                    </motion.a>
                    <motion.button 
                      onClick={() => setCurrentPage('auth')}
                      variants={itemVariants}
                      className="bg-primary/90 text-white px-6 py-2 rounded-full hover:bg-primary transition-all duration-300 w-full"
                      aria-label="Get Started"
                    >
                      Get Started
                    </motion.button>
                    <motion.button 
                      onClick={() => setCurrentPage('mentor-portal')}
                      variants={itemVariants}
                      className="bg-secondary/90 text-white px-6 py-2 rounded-full hover:bg-secondary transition-all duration-300 w-full"
                      aria-label="Mentor Portal"
                    >
                      Mentor Portal
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-center md:text-left relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Find Your Perfect
                <motion.span 
                  className="gradient-text block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Mentor Match
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-12 max-w-2xl font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Connect with industry experts who understand your journey and help
                you reach your full potential.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="relative max-w-xl w-full">
                  <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <motion.input
                    type="text"
                    placeholder="What would you like to learn?"
                    className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <motion.button 
                  className="bg-secondary/90 hover:bg-secondary text-white px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Find Mentor <Zap className="ml-2 h-5 w-5" />
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                className="mt-12 grid grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center justify-center md:justify-start space-x-2"
                >
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-gray-600">500+ Mentors</span>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center justify-center md:justify-start space-x-2"
                >
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm text-gray-600">4.9/5 Rating</span>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center justify-center md:justify-start space-x-2"
                >
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm text-gray-600">10k+ Users</span>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="hidden md:block relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                <motion.img
                  src={imageLoadError.student ? FALLBACK_IMAGES.STUDENT : HERO_IMAGES.STUDENT_ALT3}
                  alt="Team Collaboration"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                  onError={() => handleImageError('student')}
                  loading="lazy"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute -bottom-4 -right-4 bg-white p-3 rounded-xl shadow-lg"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                >
                  <Sparkles className="h-8 w-8 text-secondary" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-b from-white to-purple-50/50 py-32 relative overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 w-64 h-64 opacity-10"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <img
              src={imageLoadError.decoration ? FALLBACK_DECORATION : DECORATION_IMAGE}
              alt="Decoration"
              className="w-full h-full"
              onError={() => handleImageError('decoration')}
              loading="lazy"
            />
          </motion.div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-20"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl font-bold mb-4 tracking-tight"
                variants={itemVariants}
              >
                Why Choose Us
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto text-lg font-light"
                variants={itemVariants}
              >
                Join a community of learners and leaders shaping the future
                together.
              </motion.p>
            </motion.div>
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="glass-effect p-8 rounded-2xl card-hover relative group"
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.div
                    className={`bg-gradient-to-r ${feature.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold mb-4"
                    variants={itemVariants}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 text-lg font-light mb-6"
                    variants={itemVariants}
                  >
                    {feature.description}
                  </motion.p>
                  <motion.img
                    src={feature.illustration}
                    alt={feature.title}
                    className="w-48 h-48 mx-auto opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:transform group-hover:scale-110"
                    loading="lazy"
                    variants={itemVariants}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
