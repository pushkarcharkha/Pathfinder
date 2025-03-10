import React, { useState } from 'react';
import { Code, ArrowRight, ArrowLeft, Brain, Users } from 'lucide-react';
import Logo from './Logo';

interface Skill {
  name: string;
  rating: number;
}

interface SkillsSetupPageProps {
  onNext: (data: {
    technicalSkills: Skill[];
    softSkills: Skill[];
  }) => void;
  onBack: () => void;
  onLogoClick: () => void;
}

const SkillsSetupPage: React.FC<SkillsSetupPageProps> = ({ onNext, onBack, onLogoClick }) => {
  const [technicalSkills, setTechnicalSkills] = useState<Skill[]>([
    { name: 'Programming', rating: 5 },
    { name: 'Data Analysis', rating: 5 },
    { name: 'Development', rating: 5 },
  ]);

  const [softSkills, setSoftSkills] = useState<Skill[]>([
    { name: 'Communication', rating: 5 },
    { name: 'Leadership', rating: 5 },
    { name: 'Problem Solving', rating: 5 },
  ]);

  const handleTechnicalSkillChange = (index: number, rating: number) => {
    const newSkills = [...technicalSkills];
    newSkills[index] = { ...newSkills[index], rating };
    setTechnicalSkills(newSkills);
  };

  const handleSoftSkillChange = (index: number, rating: number) => {
    const newSkills = [...softSkills];
    newSkills[index] = { ...newSkills[index], rating };
    setSoftSkills(newSkills);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      technicalSkills,
      softSkills,
    });
  };

  const RatingBar = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
    const dots = Array.from({ length: 11 }, (_, i) => i);
    
    return (
      <div className="relative w-full py-4">
        <div className="absolute left-0 right-0 h-2 bg-gray-200 rounded-full">
          <div 
            className="absolute left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
            style={{ width: `${(value / 10) * 100}%` }}
          />
        </div>
        <div className="relative flex justify-between">
          {dots.map((dot) => (
            <button
              key={dot}
              type="button"
              className={`w-6 h-6 -mt-2 rounded-full transition-all ${
                dot <= value
                  ? 'bg-gradient-to-r from-primary to-secondary shadow-lg'
                  : 'bg-gray-200'
              }`}
              onClick={() => onChange(dot)}
            >
              <span className="block mt-8 text-xs text-gray-600">{dot}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <Logo onClick={onLogoClick} />
      </div>

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
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Profile Setup (3/4)
          </h1>
          <p className="text-gray-600">Rate your current skills</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Technical Skills */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold text-gray-800">Technical Skills</h2>
            </div>
            {technicalSkills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    {skill.name}
                  </label>
                  <span className="text-sm font-medium text-primary">
                    {skill.rating}/10
                  </span>
                </div>
                <RatingBar
                  value={skill.rating}
                  onChange={(rating) => handleTechnicalSkillChange(index, rating)}
                />
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold text-gray-800">Soft Skills</h2>
            </div>
            {softSkills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    {skill.name}
                  </label>
                  <span className="text-sm font-medium text-primary">
                    {skill.rating}/10
                  </span>
                </div>
                <RatingBar
                  value={skill.rating}
                  onChange={(rating) => handleSoftSkillChange(index, rating)}
                />
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl hover:shadow-[0_4px_15px_rgb(0,0,0,0.1)] transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group mt-8 flex items-center justify-center space-x-2"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Next</span>
            <ArrowRight className="h-5 w-5 relative" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillsSetupPage;
