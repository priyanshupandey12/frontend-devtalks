import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Github, MessageCircle, Users, Video, Search, Code, Globe, Target, Play, X, ArrowRight, User, Zap, Link, Users2, BookOpen, GraduationCap, PenTool, FolderOpen, TrendingUp, Brain, Share2, Calendar, Handshake } from 'lucide-react';

const LoginButton = ({ className, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-6 py-3 text-white bg-gray-600 rounded-xl font-medium text-lg overflow-hidden border border-gray-600 hover:border-gray-500 transition-all duration-300 hover:bg-gray-700 shadow-lg hover:shadow-gray-500/20 ${className}`}
  >
    <span className="relative z-10">Get Started</span>
  </button>
);

const DemoButton = ({ className, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-6 py-3 text-white bg-transparent rounded-xl font-medium text-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 hover:bg-gray-800/50 ${className}`}
  >
    <span className="relative z-10 flex items-center gap-2">
      <Play className="w-4 h-4" />
      Watch Demo
    </span>
  </button>
);

const NavLink = ({ id, children, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
      isActive 
        ? 'text-white' 
        : 'text-gray-400 hover:text-white'
    }`}
  >
    {children}
    <motion.span
      className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isActive ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    />
  </button>
);

const FindSimranLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isStepsInView = useInView(stepsRef, { once: true, amount: 0.3 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: heroRef, id: 'hero' },
        { ref: featuresRef, id: 'features' },
        { ref: stepsRef, id: 'howitworks' },
        { ref: ctaRef, id: 'cta' },
      ];

      for (let section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    }
  };

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const arrowVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
    hover: {
      scale: 1.2,
      x: 5,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-inter">
      <nav className="relative z-10 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-600">
              <Code className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white">DevTalks</span>
          </div>

          <div className="hidden sm:flex items-center space-x-6">
            <NavLink id="features" isActive={activeSection === 'features'} onClick={() => scrollToSection(featuresRef)}>
              Features
            </NavLink>
            <NavLink id="howitworks" isActive={activeSection === 'howitworks'} onClick={() => scrollToSection(stepsRef)}>
              How it Works
            </NavLink>
            <LoginButton onClick={() => navigate('/login')} />
          </div>

          <button
            className="sm:hidden p-2 text-white hover:text-gray-300 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <motion.div
          variants={mobileMenuVariants}
          initial="hidden"
          animate={mobileMenuOpen ? "visible" : "hidden"}
          className="fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-lg p-6 z-30 flex flex-col border-l border-gray-800 space-y-4"
        >
          <NavLink id="features" isActive={activeSection === 'features'} onClick={() => scrollToSection(featuresRef)}>
            Features
          </NavLink>
          <NavLink id="howitworks" isActive={activeSection === 'howitworks'} onClick={() => scrollToSection(stepsRef)}>
            How it Works
          </NavLink>
          <LoginButton
            onClick={() => {
              navigate('/login');
              setMobileMenuOpen(false);
            }}
            className="w-full"
          />
        </motion.div>
      </nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 px-4 sm:px-6 py-20 sm:py-32"
      >
        <div className="max-w-4xl mx-auto text-center relative overflow-hidden">
          <motion.div 
            variants={itemVariants}
            className="relative z-10"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white relative">
              <span className="text-red-500 font-extrabold animate-pulse">
                Tired
              </span>
              {' '}of{' '}
              <span className="text-gray-500">
                random
              </span>
              {' '}
              <span className="text-white ">
                DMs
              </span>
              {' '}and{' '}
              <span className="text-gray-600 font-extrabold">
                dead
              </span>
              {' '}communities?
              <motion.div
                className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-white/10 rounded-full blur-3xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                style={{ originX: 1, originY: 0 }}
              />
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-white/10 rounded-full blur-2xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 2, delay: 0.7 }}
                style={{ originX: 0, originY: 0 }}
              />
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto">
              <span className="text-gray-300">
                DevTalks helps you link up with{' '}
              </span>
              <span className="text-emerald-400 font-semibold">
                people who actually code, build,
              </span>
              <span className="text-gray-300">
                {' '}and wanna{' '}
              </span>
              <span className="text-purple-400 font-semibold animate-pulse">
                collaborate
              </span>
              <span className="text-gray-300">.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <LoginButton onClick={() => navigate('/login')} 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              />
              <DemoButton onClick={handleVideoClick} />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 -right-2 sm:top-0 sm:-right-12 text-white/70 hover:text-white transition-colors z-10"
              onClick={closeModal}
              aria-label="Close video player"
            >
              <X className="w-8 h-8" />
            </button>
            <video
              className="w-full h-auto rounded-xl shadow-2xl"
              src="/devtalks.mp4"
              controls
              autoPlay
            />
          </div>
        </motion.div>
      )}

      {/* Features Section */}
      <section ref={featuresRef} className="relative z-10 px-4 sm:px-6 py-20 sm:py-32 bg-black border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Features That Fuel Collaboration
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              From smart matching to seamless teamwork, everything built for developers who ship together.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
          >
            <motion.div variants={itemVariants} className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-purple-300 mb-2">Real-Time Chat</h3>
              <p className="text-gray-300 mb-4">Instant messaging and voice rooms to brainstorm, debug, and iterate without friction.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-900/50 rounded-xl p-6 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-orange-300 mb-2">Idea Marketplace</h3>
              <p className="text-gray-300 mb-4">Post your project ideas or join open calls to team up on game-changing builds.</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {/* Row 2 */}
            <motion.div variants={itemVariants} className="bg-gray-900/50 rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-blue-300 mb-2">Profile Showcase</h3>
              <p className="text-gray-300 mb-4">Build a dynamic profile with your GitHub, past projects, and collaboration history.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-900/50 rounded-xl p-6 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-orange-300 mb-2">Skill Filters</h3>
              <p className="text-gray-300 mb-4">Advanced search by tech stack, experience level, location, and availability.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-900/50 rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-blue-300 mb-2">Community Hubs</h3>
              <p className="text-gray-300 mb-4">Join topic-based groups for frontend, backend, AI, and more to network organically.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-purple-300 mb-2">Mentor Matches</h3>
              <p className="text-gray-300 mb-4">Pair with experienced devs for guidance on your next big project or career move.</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-1 gap-6"
          >
            {/* Row 3 */}
            <motion.div variants={itemVariants} className="bg-gray-900/50 rounded-xl p-6 border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300">
              <h3 className="text-xl font-bold text-pink-300 mb-2">GitHub Sync</h3>
              <p className="text-gray-300 mb-4">Auto-pull your repos and activity to showcase real contributions to potential partners.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section ref={stepsRef} className="relative z-10 px-4 sm:px-6 py-20 sm:py-32 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isStepsInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Get from idea to execution in just a few steps.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isStepsInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
            className="space-y-8 sm:space-y-0"
          >
            {[
              { icon: User, title: 'Sign Up & Profile', desc: 'Create your profile with skills and project ideas.' },
              { icon: Search, title: 'Find Matches', desc: 'Search or get suggested partners instantly.' },
              { icon: MessageCircle, title: 'Connect & Chat', desc: 'Message and plan your collaboration.' },
              { icon: Code, title: 'Build Together', desc: 'Share repos, track progress, and ship your project.' }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={stepVariants}
                className="flex items-center justify-between py-4 sm:py-6 relative group"
                whileHover={{ 
                  x: 10, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <motion.div 
                    className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-600 flex-shrink-0 relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.1, 
                      borderColor: '#3b82f6',
                      backgroundColor: '#3b82f6/10',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <step.icon className="w-6 h-6 text-white relative z-10" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Step {index + 1}: {step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                </div>
                {index < 3 && (
                  <>
                    <motion.div
                      variants={arrowVariants}
                      initial="hidden"
                      animate={isStepsInView ? "visible" : "hidden"}
                      whileHover="hover"
                      className="hidden sm:block w-16 flex-shrink-0 ml-4"
                    >
                      <motion.div
                        className="w-full h-1 bg-gradient-to-r from-gray-600 to-transparent rounded-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <ArrowRight className="w-8 h-8 text-gray-600 mx-auto transform rotate-90 mt-2" />
                    </motion.div>
                    <motion.div
                      variants={arrowVariants}
                      initial="hidden"
                      animate={isStepsInView ? "visible" : "hidden"}
                      whileHover="hover"
                      className="sm:hidden absolute right-0 top-1/2 transform -translate-y-1/2"
                      style={{ originX: 0 }}
                    >
                      <ArrowRight className="w-6 h-6 text-gray-600" />
                    </motion.div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative z-10 px-4 sm:px-6 py-20 sm:py-32 text-center bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Ready to find devs who match your energy?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Join DevTalks <span className="text-gray-400">→</span> Start Connecting
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
          >
            <LoginButton onClick={() => navigate('/login')} className="mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
              <Code className="w-3 h-3 text-white" />
            </div>
            <span className="text-white font-medium">DevTalks</span>
          </div>
          <p className="text-gray-500 text-sm">&copy; 2025 DevTalks. Built for builders.</p>
        </div>
      </footer>

      <style jsx>{`
        @font-face {
          font-family: 'Inter';
          font-weight: 400 700;
          src: url('/fonts/Inter-Variable.woff2') format('woff2');
        }
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default FindSimranLanding;