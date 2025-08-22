import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Github, 
  Code2, 
  Users, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  Star,
  Zap,
  UserCheck,
  GitBranch,
  LogIn,

} from 'lucide-react';

const FindSimranLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };



  const AnimatedSection = ({ children, delay = 0 }) => (
    <div 
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                DevTalks
              </span>
            </div>
            <button 
              className="btn btn-primary bg-cyan-500 border-cyan-500 hover:bg-cyan-600 hover:border-cyan-600 text-white px-6"
              onClick={handleSignUp}
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-cyan-900/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Stop Coding{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Alone
              </span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Find your project partner, co-founder, or coding buddy on DevTalks
            </p>
          </AnimatedSection>

          {/* Animated Illustration */}
          <AnimatedSection delay={400}>
            <div className="relative mx-auto w-80 h-80 mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 bg-gray-800 rounded-lg p-4 shadow-2xl border border-gray-700">
                <Code2 className="h-8 w-8 text-cyan-400 mb-2" />
                <span className="text-sm text-gray-300">Frontend</span>
              </div>
              <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 bg-gray-800 rounded-lg p-4 shadow-2xl border border-gray-700">
                <GitBranch className="h-8 w-8 text-purple-400 mb-2" />
                <span className="text-sm text-gray-300">Backend</span>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse"></div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="btn btn-lg bg-gradient-to-r from-cyan-500 to-purple-500 border-none text-white hover:scale-105 transform transition-all duration-200 shadow-2xl px-8"
                onClick={handleSignUp}
              >
                Find Your Partner (for free)
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={handleLogin}
                className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Or, Login  →
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Two Paths Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          {/* Panel A */}
          <AnimatedSection delay={800}>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-cyan-400">
                  Find Your Co-Founder. Not a Time-Waster.
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Tired of swiping through profiles that don't match your ambition? Find Simran's advanced filters 
                  let you search for serious partners based on their goals, experience, location, and even their 
                  recent GitHub activity.
                </p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">Advanced Filters</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-cyan-500/20 rounded border border-cyan-500">
                      <span className="text-sm">Goal: Build a Startup</span>
                      <CheckCircle className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-purple-500/20 rounded border border-purple-500">
                      <span className="text-sm">GitHub Activity: Last 7 days</span>
                      <CheckCircle className="h-4 w-4 text-purple-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Panel B */}
          <AnimatedSection delay={1000}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <h2 className="text-4xl font-bold mb-6 text-purple-400">
                  Just Want to Code? Team Up for Weekly Challenges.
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Don't have a big project idea? No problem. Sharpen your skills and meet new developers by 
                  teaming up for weekly coding challenges from platforms like LeetCode. It's the perfect 
                  low-stakes way to collaborate.
                </p>
              </div>
              <div className="md:order-1 bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3 text-purple-400">Weekly Challenge</h3>
                  <div className="bg-gray-800 rounded p-3 mb-4">
                    <h4 className="font-mono text-cyan-400 text-sm">Binary Tree Inorder Traversal</h4>
                    <p className="text-xs text-gray-400 mt-1">Medium • 3 interested developers</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full border-2 border-gray-800"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Connect with Confidence Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedSection delay={1200}>
            <h2 className="text-4xl font-bold mb-16">
              A Community of{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Real, Active
              </span>{' '}
              Developers
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={1400}>
              <div className="bg-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300 border border-gray-700 hover:border-cyan-500/50">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-cyan-400">Verified Profiles</h3>
                <p className="text-gray-300">
                  Connect with users who have verified their identity, reducing spam and fake profiles.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={1600}>
              <div className="bg-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300 border border-gray-700 hover:border-purple-500/50">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Github className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-purple-400">Real Activity</h3>
                <p className="text-gray-300">
                  Our GitHub filter ensures you're connecting with people who are actually pushing code, not just talking about it.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={1800}>
              <div className="bg-gray-800/50 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300 border border-gray-700 hover:border-cyan-500/50">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Smart Matching</h3>
                <p className="text-gray-300">
                  Our Synergy Score instantly shows you a compatibility rating, so you can focus on your best matches first.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection delay={2000}>
            <h2 className="text-4xl font-bold text-center mb-16">
              Don't Just Take Our{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Word For It
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={2200}>
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Anjali S.</h4>
                    <p className="text-sm text-gray-400">Student @ Manav Rachna</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "Found a partner for my final year project in two days. The filters made it so easy to find 
                  someone with the right skills at my university."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={2400}>
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Karan M.</h4>
                    <p className="text-sm text-gray-400">Founder</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "The 'Build a Startup' goal filter was a game-changer. I connected with a serious co-founder 
                  who was just as committed as I was."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection delay={2600}>
            <h2 className="text-5xl font-bold mb-6">
              Ready to Build Something{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Amazing?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Your next project partner is waiting. Join a community of passionate builders today.
            </p>
            <button 
              className="btn btn-lg bg-gradient-to-r from-cyan-500 to-purple-500 border-none text-white hover:scale-105 transform transition-all duration-200 shadow-2xl px-12 py-4"
              onClick={handleSignUp}
            >
              Sign Up and Find Your Partner Now
              <Zap className="ml-2 h-6 w-6" />
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Users className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              DevTalks
            </span>
          </div>
          <p className="text-gray-400">
            © 2025 DevTalks. Connecting developers, one partnership at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FindSimranLanding;