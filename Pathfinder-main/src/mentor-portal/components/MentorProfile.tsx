import React from 'react';
import { ArrowLeft, LogOut, Star, Briefcase, Building, Tag, Clock } from 'lucide-react';

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

interface MentorProfileProps {
  mentor: MentorData;
  onBack: () => void;
  onLogout: () => void;
}

const MentorProfile: React.FC<MentorProfileProps> = ({ mentor, onBack, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Profile
            </h1>
          </div>
          
          <button
            onClick={onLogout}
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-blue-500">
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
          
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-16 mb-6">
              <img 
                src={mentor.imageUrl} 
                alt={mentor.name}
                className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-lg"
              />
              
              <div className="mt-4 sm:mt-0 sm:ml-6">
                <h2 className="text-2xl font-bold text-gray-900">{mentor.name}</h2>
                <div className="flex items-center mt-1">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-700 font-medium">{mentor.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center ml-4">
                    <Briefcase className="h-5 w-5 text-gray-500" />
                    <span className="ml-1 text-gray-700">{mentor.role}</span>
                  </div>
                  <div className="flex items-center ml-4">
                    <Building className="h-5 w-5 text-gray-500" />
                    <span className="ml-1 text-gray-700">{mentor.company}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
              <p className="text-gray-700">{mentor.bio}</p>
            </div>
            
            {/* Expertise */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Industries */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Industries</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.industries.map((industry, index) => (
                  <div 
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center"
                  >
                    <Tag className="h-3.5 w-3.5 mr-1" />
                    {industry.charAt(0).toUpperCase() + industry.slice(1)}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Availability */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Availability</h3>
              <div className="space-y-4">
                {mentor.availability.map((day, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-32 font-medium text-gray-700">{day.day}:</div>
                    <div className="flex flex-wrap gap-2">
                      {day.slots.map((slot, slotIndex) => (
                        <div 
                          key={slotIndex}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm flex items-center"
                        >
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorProfile; 