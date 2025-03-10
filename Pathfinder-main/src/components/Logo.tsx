import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  onClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-105"
    >
      <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
        <Sparkles className="h-6 w-6 text-white" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        mentor.me
      </span>
    </button>
  );
};

export default Logo;
