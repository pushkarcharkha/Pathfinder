import React from 'react';
import Logo from './Logo';

interface AuthPageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoClick: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginClick, onSignupClick, onLogoClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <Logo onClick={onLogoClick} />
      </div>
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome to mentor.me</h2>
            <p className="text-gray-600">Your personalized learning journey begins here</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={onLoginClick}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">Login</span>
            </button>

            <button
              onClick={onSignupClick}
              className="w-full bg-white text-gray-800 border-2 border-gray-200 px-6 py-3 rounded-xl hover:border-primary/30 hover:bg-gray-50 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
