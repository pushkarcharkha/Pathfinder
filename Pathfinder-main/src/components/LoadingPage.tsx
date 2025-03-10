import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Logo from './Logo';

interface LoadingPageProps {
  onComplete: () => void;
  onLogoClick: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onComplete, onLogoClick }) => {
  useEffect(() => {
    console.log("Starting loading timer...");
    const timer = setTimeout(() => {
      console.log("Loading complete, transitioning...");
      onComplete();
    }, 1000);

    return () => {
      console.log("Cleaning up loading timer...");
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <Logo onClick={onLogoClick} />
      </div>
      
      <div className="w-full max-w-lg px-8 py-12 text-center space-y-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8">
          Analyzing your profile
        </h1>
        
        <div className="flex justify-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        </div>
        
        <div className="space-y-4 mt-8">
          <p className="text-xl font-medium text-gray-800">
            Creating your personalized learning path...
          </p>
          <p className="text-gray-600">
            This may take a few moments
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
