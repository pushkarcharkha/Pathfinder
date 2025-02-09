import React from 'react';
import {
  Sparkles,
  Search,
  Brain,
  Target,
  Calendar,
  Users,
  Star,
  MessageSquare,
  Zap,
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary animate-float" />
              <span className="ml-2 text-xl font-bold gradient-text">
                mentor.me
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Find Mentors
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Resources
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Stories
              </a>
              <button className="bg-primary/90 text-white px-6 py-2 rounded-full hover:bg-primary transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left relative">
            <div className="absolute top-0 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2">
              <Sparkles className="h-12 w-12 text-secondary animate-bounce-slow" />
            </div>
            <h1 className="text-6xl font-bold mb-6 leading-tight tracking-tight">
              Find Your Perfect
              <span className="gradient-text block">Mentor Match</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl font-light">
              Connect with industry experts who understand your journey and help
              you reach your full potential.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative max-w-xl w-full">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What would you like to learn?"
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <button className="bg-secondary/90 hover:bg-secondary text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                Find Mentor <Zap className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <img
              src="https://raw.githubusercontent.com/heydrdev/devtools/main/cartoon-illustrations/png/d17.png"
              alt="Mentoring Illustration"
              className="w-full h-auto animate-float"
            />
            <div
              className="absolute -top-8 -right-8 animate-float"
              style={{ animationDelay: '1s' }}
            >
              <img
                src="https://raw.githubusercontent.com/heydrdev/devtools/main/cartoon-illustrations/png/d14.png"
                alt="Student"
                className="w-48 h-48"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gradient-to-b from-white to-purple-50/50 py-32 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-64 h-64 opacity-10">
          <img
            src="https://raw.githubusercontent.com/heydrdev/devtools/main/cartoon-illustrations/png/d4.png"
            alt="Decoration"
            className="w-full h-full"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
              Join a community of learners and leaders shaping the future
              together.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-6 w-6 text-white" />,
                title: 'Expert Mentors',
                description:
                  "Connect with industry leaders who've walked the path before you.",
                gradient: 'from-rose-400 to-rose-600',
                illustration:
                  'https://raw.githubusercontent.com/heydrdev/devtools/main/cartoon-illustrations/png/d9.png',
              },
              {
                icon: <Calendar className="h-6 w-6 text-white" />,
                title: 'Flexible Schedule',
                description:
                  'Book sessions that align perfectly with your timeline.',
                gradient: 'from-fuchsia-400 to-fuchsia-600',
                illustration:
                  'https://raw.githubusercontent.com/heydrdev/devtools/main/cartoon-illustrations/png/d10.png',
              },
              {
                icon: <Target className="h-6 w-6 text-white" />,
                title: 'Personalized Path',
                description:
                  'Custom guidance tailored to your unique goals and aspirations.',
                gradient: 'from-violet-400 to-violet-600',
                illustration:
                  'https://raw.githubusercontent.com/heydrdev/devtools/main/cartoon-illustrations/png/d8.png',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-effect p-8 rounded-2xl card-hover relative"
              >
                <div
                  className={`bg-gradient-to-r ${feature.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg font-light mb-6">
                  {feature.description}
                </p>
                <img
                  src={feature.illustration}
                  alt={feature.title}
                  className="w-48 h-48 mx-auto opacity-90 transition-all duration-300 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Mentors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-20 relative">
          <img
            src="https://storyset.com/illustration/on-the-office/rafiki"
            alt="Team"
            className="w-48 h-48 absolute -top-24 left-1/2 transform -translate-x-1/2 opacity-80"
          />
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Featured Mentors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Learn from the best in their fields.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Alex Chen',
              role: 'Senior Engineer at Google',
              image:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800',
              tags: ['Engineering', 'AI', 'Leadership'],
            },
            {
              name: 'Sarah Kim',
              role: 'Design Director at Spotify',
              image:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800',
              tags: ['Design', 'UX', 'Brand'],
            },
            {
              name: 'Marcus Johnson',
              role: 'Startup Founder & Advisor',
              image:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800',
              tags: ['Startup', 'Growth', 'Strategy'],
            },
          ].map((mentor, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl overflow-hidden card-hover"
            >
              <div className="relative">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 glass-effect rounded-full px-3 py-1 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-700 font-medium">4.9</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{mentor.name}</h3>
                    <p className="text-gray-600 font-light">{mentor.role}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {mentor.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-purple-50 text-purple-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center">
                  Schedule Session <MessageSquare className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary via-fuchsia-500 to-secondary py-20 relative overflow-hidden">
        <img
          src="https://raw.githubusercontent.com/heydrdev/devtools/main/cartoon-illustrations/png/d12.png"
          alt="Students"
          className="absolute right-0 bottom-0 w-96 h-96 opacity-20"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Start Your Journey
          </h2>
          <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg font-light">
            Join our community of mentors and mentees making a difference.
          </p>
          <button className="glass-effect text-primary px-10 py-4 rounded-full hover:scale-105 transition-all duration-300 font-bold text-lg">
            Get Started
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Brain className="h-8 w-8 text-primary" />
                <span className="ml-2 text-2xl font-bold gradient-text">
                  mentor.me
                </span>
              </div>
              <p className="text-gray-400 text-lg font-light">
                Empowering growth through meaningful connections.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Links</h4>
              <ul className="space-y-4 font-light">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Find Mentors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Become a Mentor
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-4 font-light">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-6 font-light">
                Stay updated with the latest insights.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-800 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary text-white px-6 rounded-r-xl hover:bg-primary-dark transition-all duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
