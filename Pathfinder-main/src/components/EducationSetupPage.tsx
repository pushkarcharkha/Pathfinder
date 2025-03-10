import React, { useState, useRef } from 'react';
import { GraduationCap, ArrowRight, ArrowLeft, Plus, X, Upload, FileText } from 'lucide-react';
import Logo from './Logo';

interface Certificate {
  name: string;
  file?: File;
}

interface EducationSetupPageProps {
  onNext: (data: {
    education: string;
    fieldOfStudy: string;
    institution: string;
    certificates: Certificate[];
  }) => void;
  onBack: () => void;
  onLogoClick: () => void;
}

const EducationSetupPage: React.FC<EducationSetupPageProps> = ({ onNext, onBack, onLogoClick }) => {
  const [education, setEducation] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [institution, setInstitution] = useState('');
  const [certificates, setCertificates] = useState<Certificate[]>([{ name: '' }]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      education,
      fieldOfStudy,
      institution,
      certificates: certificates.filter(cert => cert.name.trim() !== '')
    });
  };

  const addCertificate = () => {
    setCertificates([...certificates, { name: '' }]);
  };

  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
    fileInputRefs.current = fileInputRefs.current.filter((_, i) => i !== index);
  };

  const handleCertificateNameChange = (index: number, name: string) => {
    const newCertificates = [...certificates];
    newCertificates[index] = { ...newCertificates[index], name };
    setCertificates(newCertificates);
  };

  const handleFileUpload = (index: number, file: File) => {
    const newCertificates = [...certificates];
    newCertificates[index] = { ...newCertificates[index], file };
    setCertificates(newCertificates);
  };

  const educationLevels = [
    'High School',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Ph.D.',
    'Diploma',
    'Certificate',
    'Other'
  ];

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
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Profile Setup (2/4)
          </h1>
          <p className="text-gray-600">Educational Background</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Education Level */}
          <div>
            <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Current/Highest Education
            </label>
            <select
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50"
              required
            >
              <option value="">Select education level</option>
              {educationLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Field of Study */}
          <div>
            <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Field of Study
            </label>
            <input
              id="fieldOfStudy"
              type="text"
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50"
              placeholder="e.g., Computer Science"
              required
            />
          </div>

          {/* Institution */}
          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Institution
            </label>
            <input
              id="institution"
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50"
              placeholder="Enter your institution name"
              required
            />
          </div>

          {/* Certificates */}
          <div>
            <div className="flex items-center justify-between mb-1 ml-1">
              <label className="block text-sm font-medium text-gray-700">
                Additional Certificates
              </label>
              <button
                type="button"
                onClick={addCertificate}
                className="text-primary hover:text-primary/80 text-sm font-medium flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add Another</span>
              </button>
            </div>
            <div className="space-y-4">
              {certificates.map((cert, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => handleCertificateNameChange(index, e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50/30 transition-all hover:bg-gray-50/50"
                      placeholder="Certificate name"
                    />
                    <button
                      type="button"
                      onClick={() => removeCertificate(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      ref={el => fileInputRefs.current[index] = el}
                      onChange={(e) => e.target.files && handleFileUpload(index, e.target.files[0])}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[index]?.click()}
                      className="flex-1 px-4 py-2.5 border border-dashed border-gray-300 rounded-xl hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all group text-left"
                    >
                      <div className="flex items-center space-x-2">
                        {cert.file ? (
                          <>
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="text-sm text-gray-600">{cert.file.name}</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                            <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Upload Certificate (Optional)</span>
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
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

export default EducationSetupPage;
