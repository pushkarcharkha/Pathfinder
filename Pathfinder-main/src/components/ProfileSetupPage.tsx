import React, { useState, useRef } from 'react';
import { User, Upload, ArrowRight } from 'lucide-react';
import Logo from './Logo';

interface ProfileSetupPageProps {
  onNext: (data: {
    fullName: string;
    email: string;
    age: string;
    profileImage?: File;
  }) => void;
  onLogoClick: () => void;
}

const ProfileSetupPage: React.FC<ProfileSetupPageProps> = ({ onNext, onLogoClick }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      fullName,
      email,
      age,
      profileImage: image || undefined
    });
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
          <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 shadow-[0_4px_20px_rgb(0,0,0,0.1)] mb-4">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Profile Setup (1/4)
          </h1>
          <p className="text-gray-600">Tell us about yourself</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div 
              className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-50 cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm">Upload Photo</p>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50"
              placeholder="Enter your age"
              required
              min="13"
              max="120"
            />
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

export default ProfileSetupPage;
