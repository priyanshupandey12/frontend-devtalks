import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Github, MessageCircle, Users, Video, Search, Code, Globe, Target, Play, X, ArrowRight, User, Zap, Link, Users2, BookOpen, GraduationCap, PenTool, FolderOpen, TrendingUp, Brain, Share2, Calendar, Handshake, ChevronRight } from 'lucide-react';



const LoginButton = ({ className, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative px-6 py-2.5 bg-white text-black rounded-full font-semibold text-sm transition-all duration-300 hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] ${className}`}
  >
    <span className="relative z-10 flex items-center gap-2">
      Get Started
    </span>
  </button>
);

const DemoButton = ({ className, onClick }) => (
  <button
    onClick={onClick}
    className={`group flex items-center justify-center px-6 py-2.5 text-zinc-300 bg-white/5 backdrop-blur-sm rounded-full font-medium text-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 hover:text-white ${className}`}
  >
    <span className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors shrink-0">
        <Play className="w-3 h-3 fill-current ml-0.5" />
      </div>
      <span className="leading-none">Watch Demo</span>
    </span>
  </button>
);

const NavLink = ({ id, children, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
      isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
    }`}
  >
    {children}
    {isActive && (
      <motion.div
        layoutId="activeNav"
        className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </button>
);


const GridBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black"></div>
  </div>
);

const FindSimranLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const ctaRef = useRef(null);

  // 1. Scroll Beam Logic (Now using stepsRef)
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start center", "end center"]
  });
  
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);


  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isStepsInView = useInView(stepsRef, { once: true, amount: 0.3 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const handleVideoClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    if(ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 relative overflow-hidden font-inter selection:bg-white/20">
      <GridBackground />
      

      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-zinc-100 to-zinc-500 rounded-lg flex items-center justify-center shadow-lg shadow-white/10">
                <Code className="w-4 h-4 text-black" />
              </div>
              <span className="text-lg font-bold tracking-tight">DevTalks</span>
            </div>

            <div className="hidden md:flex items-center space-x-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
              <NavLink id="features" isActive={activeSection === 'features'} onClick={() => scrollToSection(featuresRef)}>
                Features
              </NavLink>
              <NavLink id="howitworks" isActive={activeSection === 'howitworks'} onClick={() => scrollToSection(stepsRef)}>
                How it Works
              </NavLink>
            </div>

            <div className="hidden md:block">
               <LoginButton onClick={() => navigate('/login')} />
            </div>

            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden bg-black border-b border-white/10"
        >
          <div className="px-4 py-6 space-y-4 flex flex-col items-center">
            <button onClick={() => scrollToSection(featuresRef)} className="text-zinc-400 hover:text-white">Features</button>
            <button onClick={() => scrollToSection(stepsRef)} className="text-zinc-400 hover:text-white">How it Works</button>
            <LoginButton onClick={() => navigate('/login')} className="w-full" />
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 pt-32 pb-20 px-4 sm:px-6 min-h-[80vh] flex flex-col justify-center items-center"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
           <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">The network for builders</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-6 text-white leading-[1.1]"
          >
            Tired of random DMs
            <br className="hidden md:block" />
            and <span className="text-zinc-600">dead</span> communities?
          </motion.h1>

          <motion.p variants={itemVariants} className="text-base sm:text-lg text-zinc-400 mb-8 max-w-xl mx-auto leading-relaxed">
            DevTalks links you with <span className="text-zinc-100 font-semibold">real builders</span> who want to <span className="text-zinc-100 font-semibold">collaborate</span>, not just chat.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <LoginButton onClick={() => navigate('/login')} className="h-10 px-6 text-sm" />
            <DemoButton onClick={handleVideoClick} className="h-10 px-6 text-sm" />
          </motion.div>
        </div>
      </motion.section>

      {/* Video Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 p-2 bg-black/50 text-white hover:bg-white hover:text-black rounded-full transition-all z-10">
              <X className="w-5 h-5" />
            </button>
            <video className="w-full h-full object-cover" src="/devtalks.mp4" controls autoPlay />
          </div>
        </motion.div>
      )}

      {/* Features Section */}
      <section ref={featuresRef} className="relative z-10 py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mb-16 md:mb-24"
          >
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              Features That Fuel <span className="text-zinc-500">Collaboration</span>
            </motion.h2>
      
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Real-Time Chat", desc: "Instant messaging and voice rooms to brainstorm without friction.", color: "text-purple-400", border: "hover:shadow-purple-500/10" },
              { title: "Idea Marketplace", desc: "Post your project ideas or join open calls to team up on builds.", color: "text-orange-400", border: "hover:shadow-orange-500/10" },
              { title: "Profile Showcase", desc: "Dynamic profile with your GitHub, past projects, and history.", color: "text-blue-400", border: "hover:shadow-blue-500/10" },
              { title: "Skill Filters", desc: "Advanced search by tech stack, experience level, and availability.", color: "text-emerald-400", border: "hover:shadow-emerald-500/10" },
              { title: "Community Hubs", desc: "Topic-based groups for AI, Web3, and more to network organically.", color: "text-pink-400", border: "hover:shadow-pink-500/10" },
              { title: "GitHub Sync", desc: "Auto-pull your repos to showcase real contributions.", color: "text-white", border: "hover:shadow-white/10" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`group p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 ${feature.border}`}
              >
                <div className={`mb-4 text-sm font-mono opacity-80 ${feature.color}`}>0{idx + 1}</div>
                <h3 className={`text-xl font-bold mb-3 text-zinc-100`}>{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section - Vertical Scroll Beam */}
      <section ref={stepsRef} className="relative z-10 py-32 bg-black border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
              How It Works
            </h2>
            <p className="text-zinc-400">
              Your path to collaboration.
            </p>
          </motion.div>

          <div className="relative">
   
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-800/50">
              
      
              <motion.div
                style={{ height }}
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)]"
              >
               
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_20px_2px_rgba(255,255,255,1)]" />
              </motion.div>
            </div>

            <div className="space-y-24">
              {[
                { icon: User, title: 'Sign Up', desc: 'Create your profile with your tech stack and interests.' },
                { icon: Search, title: 'Find Matches', desc: 'Our algorithm finds developers with complementary skills.' },
                { icon: MessageCircle, title: 'Connect', desc: 'Start a chat or jump into a voice room to sync up.' },
                { icon: Code, title: 'Build', desc: 'Share repositories and start shipping code together.' }
              ].map((step, index) => (
                <div key={index} className="relative pl-24 group">
                  
                
                  <div className="absolute left-0 top-0 w-16 h-16 bg-black border border-zinc-800 rounded-full flex items-center justify-center z-10 group-hover:border-zinc-600 transition-colors duration-500">
                    <div className="absolute inset-0 bg-zinc-900 rounded-full -z-10" />
                    <step.icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors duration-300" />
                  </div>

             
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="text-xs font-mono text-zinc-500 mb-2 block">Step 0{index + 1}</span>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-zinc-400 leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative z-10 py-32 border-t border-white/5 bg-black overflow-hidden">
     
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
          <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>

        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Stop searching. Start building.
            </h2>
            <p className="text-zinc-500 text-lg mb-8 max-w-xl mx-auto">
              The code connects us. The community keeps us going.
              <br />
              Find your circle today.
            </p>
            
            <div className="flex justify-center">
              <LoginButton 
                onClick={() => navigate('/login')} 
                className="h-12 px-8 text-base shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]" 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Brand & Copy */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center border border-white/10">
                <Code className="w-3 h-3 text-zinc-300" />
              </div>
              <span className="text-zinc-200 font-semibold text-sm tracking-tight">DevTalks</span>
            </div>
            <span className="hidden md:block w-px h-4 bg-zinc-800"></span>
            <p className="text-zinc-600 text-xs font-mono">
              &copy; 2025 Inc. All rights reserved.
            </p>
          </div>

     
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
};

export default FindSimranLanding;