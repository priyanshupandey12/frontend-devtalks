import { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Github, MessageCircle, Users, Video, Search, Code, Globe, Target , Play, X} from 'lucide-react';


const NUM_PARTICLES = 20;
const NUM_NODES = 6;

const LoginButton = ({ className, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-6 py-3 text-white bg-gray-900 rounded-xl font-medium text-lg overflow-hidden
               before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-transparent
               before:transition-all before:duration-300 hover:before:border-gradient-to-r hover:before:from-blue-500
               hover:before:to-purple-600 hover:before:bg-gray-800/80 shadow hover:shadow-md transition-all duration-300
               ${className}`}
  >
    <span className="relative z-10">Login</span>
  </button>
);


const FindSimranLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

     const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);
const handleVideoClick = () => {
  setIsModalOpen(true);

  if (videoRef.current) {
    videoRef.current.pause();
  }
};

const closeModal = () => {
  setIsModalOpen(false);

  if (videoRef.current) {
    videoRef.current.play();
  }
};

  useEffect(() => {

    setIsVisible(true);


   
    setParticles(
      Array.from({ length: NUM_PARTICLES }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.5}s`,
        duration: `${1 + Math.random() * 1}s`
      }))
    );

    
    setNodes(
      Array.from({ length: NUM_NODES }).map((_, i) => {
        const icons = [<Code />, <MessageCircle />, <Video />, <Github />, <Search />, <Globe />];
        const colors = [
          'from-blue-500 to-cyan-400',
          'from-purple-500 to-pink-400',
          'from-green-500 to-teal-400',
          'from-orange-500 to-red-400',
          'from-yellow-500 to-orange-400',
          'from-indigo-500 to-purple-400'
        ];
        return { icon: icons[i], color: colors[i] };
      })
    );

  
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden font-inter">

   
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

     
     <nav className="relative z-10 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800/50">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-black-600 rounded-xl flex items-center justify-center">
        <Code className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
      </div>
      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        DevTalks
      </span>
    </div>


    <div className="hidden sm:flex items-center space-x-4">
      <LoginButton onClick={() => navigate('/login')} />
    </div>


    <button
      className="sm:hidden p-2 text-white hover:text-gray-300 transition-colors z-60"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      aria-label="Toggle mobile menu"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

{mobileMenuOpen && (
  <div className=" fixed top-0 right-0 h-full w-64 bg-gray-900/95 backdrop-blur-lg p-6 z-30 flex flex-col">
    <LoginButton
      onClick={() => {
        navigate('/login');
        setMobileMenuOpen(false);
      }}
      className="w-full mb-4"
    />
  </div>
)}
</nav>

  
     <section className="relative z-10 px-4 sm:px-6 py-10 sm:py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Stop Coding</span><br/>
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Alone.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
            DevTalks is the platform for engineering students in India to find partners, build projects, and grow their network.
          </p>
        </div>

        {/* 🔹 Video Preview */}
        <div className="relative">
    <div
          className="relative h-60 sm:h-80 bg-black rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group shadow-2xl border border-gray-700/50 transition-all duration-300 hover:shadow-blue-500/20"
          onClick={handleVideoClick}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            src="/video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300">
        
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" />
            </div>
          </div>
        </div>
        </div>
      </div>

{isModalOpen && (
          <div
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
                src="/video.mp4"
                controls
                autoPlay
              />
            </div>
          </div>
        )}
    </section>

      <section className="relative z-10 px-4 sm:px-6 py-10 sm:py-20 bg-gray-800/30">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-8 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
         Every Engineering Student's <span className="bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">Nightmare...</span>
      </h2>
           <p className="text-lg sm:text-xl text-gray-300">Sound familiar? 🤔</p>
    </div>

   <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-xl sm:text-2xl">😤</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-red-300 mb-1 sm:mb-2">Frustrated Dev</h3>
                    <div className="text-gray-300 text-xs sm:text-sm">
                      No backend partner...
                    </div>
                  </div>
                </div>
                <div className="text-4xl sm:text-6xl text-red-400/50 animate-pulse rotate-90 sm:rotate-0">➡️</div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center animate-bounce delay-500">
                    <span className="text-xl sm:text-2xl">😊</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-green-300 mb-1 sm:mb-2">Happy Builder</h3>
                    <div className="text-gray-300 text-xs sm:text-sm">
                      Found perfect match!
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4 sm:mt-6">
                <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
                  <span className="text-blue-300 font-medium text-sm sm:text-base">DevTalks Magic ✨</span>
                </div>
              </div>
            </div>
          </div>
  </div>
</section>

<section className="relative z-10 px-4 sm:px-6 py-10 sm:py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Great Ideas Need <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Great Teams.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {[{
              icon: <Code className="w-8 h-8 sm:w-12 sm:h-12" />,
              title: "Frontend Expert?",
              desc: "You're a great frontend dev, but you need a backend partner for your project.",
              color: "from-blue-500 to-cyan-500"
            }, {
              icon: <Users className="w-8 h-8 sm:w-12 sm:h-12" />,
              title: "Backend Pro?",
              desc: "You can build a solid API, but you need a designer to make it look professional.",
              color: "from-purple-500 to-pink-500"
            }, {
              icon: <Target className="w-8 h-8 sm:w-12 sm:h-12" />,
              title: "Great Idea?",
              desc: "You have the perfect project idea for your resume, but you can't build it alone.",
              color: "from-green-500 to-teal-500"
            }].map((item, index) => (
              <div key={index} className="group hover:scale-105 transition-transform duration-300">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 h-full text-center">
                  <div className={`w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 text-white group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{item.title}</h3>
                  <p className="text-gray-300 text-sm sm:text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  <section className="relative z-10 px-4 sm:px-6 py-10 sm:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-24">
          {/* Feature 1 */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Find the Right Partner, <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Instantly.</span>
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                Our advanced search lets you filter by tech stack, experience level, location, 
                and even recent GitHub activity to find the perfect collaborator.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-gray-700/50">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-700/50 rounded-xl gap-2 sm:gap-0">
                  <span className="text-gray-300 text-sm sm:text-base">Tech Stack</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs sm:text-sm">React</span>
                    <span className="px-2 sm:px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs sm:text-sm">Node.js</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-700/50 rounded-xl">
                  <span className="text-gray-300 text-sm sm:text-base">Location</span>
                  <span className="text-white text-sm sm:text-base">Delhi NCR</span>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-700/50 rounded-xl">
                  <span className="text-gray-300 text-sm sm:text-base">GitHub Activity</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-sm sm:text-base">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

      
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="lg:order-2">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Collaborate in <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">Real-Time.</span>
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                Once you connect, jump straight into planning with our built-in real-time chat .
              </p>
            </div>
            <div className="lg:order-1 bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-gray-700/50">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">A</div>
                  <div className="bg-blue-500/20 p-2 sm:p-3 rounded-lg max-w-xs">
                    <p className="text-blue-100 text-xs sm:text-sm">Hey! Ready to start on the frontend?</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3 justify-end">
                  <div className="bg-purple-500/20 p-2 sm:p-3 rounded-lg max-w-xs">
                    <p className="text-purple-100 text-xs sm:text-sm">Yes! I've got the API endpoints ready</p>
                  </div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">P</div>
                </div>
          
              </div>
            </div>
          </div>

     
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Discover Your Next <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">Mission.</span>
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                Don't have an idea? Browse the Idea Marketplace for projects posted by other students. 
                Have a great idea? Post it and recruit your team.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-gray-700/50">
              <div className="space-y-3 sm:space-y-4">
                {[
                  { title: "E-commerce Mobile App", tech: "React Native + Firebase", members: "2/3" },
                  { title: "AI Chat Bot", tech: "Python + TensorFlow", members: "1/2" },
                  { title: "Social Media Dashboard", tech: "Next.js + MongoDB", members: "3/4" }
                ].map((project, idx) => (
                  <div key={idx} className="p-3 sm:p-4 bg-gray-700/50 rounded-xl">
                    <div className="flex justify-between items-start mb-1 sm:mb-2">
                      <h4 className="text-white font-semibold text-sm sm:text-base">{project.title}</h4>
                      <span className="text-xs text-green-300 bg-green-500/20 px-2 py-1 rounded">{project.members}</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">{project.tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

   
      <section className="relative z-10 px-4 sm:px-6 py-10 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Ready to Build Something <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Awesome?</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
            Your next project partner is waiting. Join the community of student builders in India.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
      `}</style>
      
    </div>

  );
};

export default FindSimranLanding;
