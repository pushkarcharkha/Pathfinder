import React, { useState } from 'react';
import { Target, ArrowLeft, Calendar, Briefcase } from 'lucide-react';

interface CareerGoalsPageProps {
  onComplete: (data: {
    desiredRoles: string[];
    industryPreference: string[];
    timeline: string;
    specificGoal: string;
  }) => void;
  onBack: () => void;
}

const CareerGoalsPage: React.FC<CareerGoalsPageProps> = ({ onComplete, onBack }) => {
  const [desiredRoles, setDesiredRoles] = useState<string[]>([]);
  const [newRole, setNewRole] = useState('');
  const [industryPreference, setIndustryPreference] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [specificGoal, setSpecificGoal] = useState('');

  const industries = [
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'manufacturing', name: 'Manufacturing', icon: '🏭' },
    { id: 'retail', name: 'Retail', icon: '🛍️' }
  ];

  const commonRoles = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'Business Analyst',
    'Project Manager',
    'Marketing Manager',
    'Financial Analyst',
    'Teacher',
    'Healthcare Professional'
  ];

  const handleAddRole = () => {
    if (newRole && !desiredRoles.includes(newRole)) {
      setDesiredRoles([...desiredRoles, newRole]);
      setNewRole('');
    }
  };

  const handleRemoveRole = (role: string) => {
    setDesiredRoles(desiredRoles.filter(r => r !== role));
  };

  const toggleIndustry = (industry: string) => {
    if (industryPreference.includes(industry)) {
      setIndustryPreference(industryPreference.filter(i => i !== industry));
    } else {
      setIndustryPreference([...industryPreference, industry]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      desiredRoles,
      industryPreference,
      timeline,
      specificGoal
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      <div className="w-full max-w-2xl px-8 py-10 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
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
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Profile Setup (4/4)
          </h1>
          <p className="text-gray-600">What are your career goals?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Desired Roles */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Desired Roles
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRole())}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50"
                placeholder="Search or enter desired roles"
                list="roles-list"
              />
              <datalist id="roles-list">
                {commonRoles.map(role => (
                  <option key={role} value={role} />
                ))}
              </datalist>
            </div>
            {desiredRoles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {desiredRoles.map(role => (
                  <span
                    key={role}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center group"
                  >
                    {role}
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(role)}
                      className="ml-2 text-primary/50 hover:text-primary"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Industry Preference */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Industry Preference
            </label>
            <div className="grid grid-cols-3 gap-4">
              {industries.map(industry => (
                <button
                  key={industry.id}
                  type="button"
                  onClick={() => toggleIndustry(industry.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center space-y-2
                    ${industryPreference.includes(industry.id)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                    }`}
                >
                  <span className="text-2xl">{industry.icon}</span>
                  <span className="text-sm font-medium">{industry.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Timeline
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50"
                placeholder="e.g., 2 years, 6 months"
                required
              />
            </div>
          </div>

          {/* Specific Goal */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Specific Goal
            </label>
            <textarea
              value={specificGoal}
              onChange={(e) => setSpecificGoal(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50 min-h-[120px] resize-none"
              placeholder="Describe your specific career goal..."
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 bg-gray-50 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-[0_4px_15px_rgb(0,0,0,0.05)]"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl hover:shadow-[0_4px_15px_rgb(0,0,0,0.1)] transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">Complete Setup</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerGoalsPage;
