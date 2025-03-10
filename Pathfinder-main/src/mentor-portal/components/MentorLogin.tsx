import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, Brain, Lock, Mail, AlertCircle } from 'lucide-react';

interface MentorLoginProps {
  onLogin: (email: string, password: string) => void;
  onRegister: () => void;
  loading: boolean;
  error: string | null;
}

const MentorLogin: React.FC<MentorLoginProps> = ({ onLogin, onRegister, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formFocused, setFormFocused] = useState<'email' | 'password' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

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

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        duration: 0.7 
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
    disabled: { opacity: 0.7, scale: 1 }
  };

  const inputVariants = {
    focused: { scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.3)" },
    unfocused: { scale: 1, boxShadow: "0 0 0 0px rgba(99, 102, 241, 0)" }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <motion.div 
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-8 py-12 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={logoVariants}
            className="inline-block"
          >
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full inline-block">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </motion.div>
          <motion.h1 
            className="text-3xl font-bold text-white mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Mentor Portal
          </motion.h1>
          <motion.p 
            className="text-indigo-100 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Sign in to access your dashboard
          </motion.p>
        </div>

        {/* Form */}
        <motion.div 
          className="px-8 py-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {error && (
            <motion.div 
              className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"
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

          <form onSubmit={handleSubmit}>
            <motion.div className="mb-6" variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <motion.div 
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  animate={{ 
                    x: formFocused === 'email' ? 2 : 0,
                    transition: { type: 'spring', stiffness: 300, damping: 15 }
                  }}
                >
                  <Mail className={`h-5 w-5 ${formFocused === 'email' ? 'text-indigo-500' : 'text-gray-400'}`} />
                </motion.div>
                <motion.input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  onFocus={() => setFormFocused('email')}
                  onBlur={() => setFormFocused(null)}
                  variants={inputVariants}
                  animate={formFocused === 'email' ? 'focused' : 'unfocused'}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="mentor@example.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div className="mb-8" variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <motion.div 
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  animate={{ 
                    x: formFocused === 'password' ? 2 : 0,
                    transition: { type: 'spring', stiffness: 300, damping: 15 }
                  }}
                >
                  <Lock className={`h-5 w-5 ${formFocused === 'password' ? 'text-indigo-500' : 'text-gray-400'}`} />
                </motion.div>
                <motion.input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  onFocus={() => setFormFocused('password')}
                  onBlur={() => setFormFocused(null)}
                  variants={inputVariants}
                  animate={formFocused === 'password' ? 'focused' : 'unfocused'}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                animate={loading ? "disabled" : "initial"}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <LogIn className="mr-2 h-5 w-5" />
                )}
                {loading ? "Signing in..." : "Sign in"}
              </motion.button>
            </motion.div>
          </form>

          <motion.div 
            className="mt-8 text-center text-sm text-gray-500"
            variants={itemVariants}
          >
            <p>Don't have an account? <button onClick={onRegister} className="text-indigo-600 hover:text-indigo-500">Register here</button></p>
          </motion.div>

          <motion.div 
            className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-500"
            variants={itemVariants}
          >
            <p className="mb-2 font-medium text-gray-700">Demo Login</p>
            <p>Email: michael.rodriguez@example.com</p>
            <p>Password: mentor123</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MentorLogin;