import React, { useState } from 'react';
import { User, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Logo from './Logo';

interface SignupPageProps {
  onBack: () => void;
  onSignup: (username: string, password: string) => void;
  onLogoClick: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onBack, onSignup, onLogoClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    onSignup(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <Logo onClick={onLogoClick} />
      </div>

      <div className="w-full max-w-md px-8 py-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>
        
        {/* Header Section */}
        <div className="text-center mb-8 relative">
          <button
            onClick={onBack}
            className="absolute left-0 top-2 text-gray-600 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 shadow-[0_4px_20px_rgb(0,0,0,0.1)] mb-4">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-600">Join our community today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50"
                placeholder="Choose a username"
                required
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm rounded-lg p-3 flex items-center space-x-2">
              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4 pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl hover:shadow-[0_4px_15px_rgb(0,0,0,0.1)] transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">Create Account</span>
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full bg-gray-50 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-[0_4px_15px_rgb(0,0,0,0.05)]"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
