import React from 'react';
import {
  Settings,
  UserPlus,
  HelpCircle,
  LogOut,
  Edit3,
  User
} from 'lucide-react';

interface ProfilePageProps {
  onLogout: () => void;
  onLogoClick: () => void;
  onNavigate: (page: 'profile-setup' | 'settings' | 'invite-friends' | 'help') => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout, onLogoClick, onNavigate }) => {
  const menuItems = [
    {
      icon: <Edit3 className="h-5 w-5" />,
      label: 'Edit Profile',
      onClick: () => onNavigate('profile-setup')
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      onClick: () => onNavigate('settings')
    },
    {
      icon: <UserPlus className="h-5 w-5" />,
      label: 'Invite Friends',
      onClick: () => onNavigate('invite-friends')
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: 'Help',
      onClick: () => onNavigate('help')
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 relative">
      {/* Clickable Logo */}
      <button onClick={onLogoClick} className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 cursor-pointer" />
      </button>

      <div className="w-full max-w-md px-8 py-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>

        {/* Profile Section */}
        <div className="relative">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.1)]">
              <div className="bg-white p-5 rounded-xl">
                <User className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              John Doe
            </h2>
            <p className="text-gray-600 mb-4">john.doe@example.com</p>
            <div className="flex items-center justify-center space-x-3">
              <span className="px-4 py-1.5 bg-gradient-to-r from-primary/10 to-primary/20 text-primary rounded-full text-sm font-medium shadow-[0_2px_10px_rgb(0,0,0,0.06)]">
                Student
              </span>
              <span className="px-4 py-1.5 bg-gradient-to-r from-secondary/10 to-secondary/20 text-secondary rounded-full text-sm font-medium shadow-[0_2px_10px_rgb(0,0,0,0.06)]">
                Active
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50/80 transition-all duration-300 text-left group relative overflow-hidden hover:shadow-[0_4px_15px_rgb(0,0,0,0.08)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-2.5 rounded-xl group-hover:shadow-[0_2px_8px_rgb(0,0,0,0.08)] transition-all duration-300 relative">
                  {item.icon}
                </div>
                <span className="text-gray-700 text-base font-medium group-hover:text-primary transition-colors relative">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full mt-8 flex items-center justify-center space-x-3 bg-gradient-to-r from-red-50 to-red-100 text-red-600 p-4 rounded-xl hover:shadow-[0_4px_15px_rgb(0,0,0,0.1)] transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <LogOut className="h-5 w-5 relative" />
            <span className="relative font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;