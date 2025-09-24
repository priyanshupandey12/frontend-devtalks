import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Github, MessageCircle, Users, Video, Search, Code, Globe, Target } from 'lucide-react';
import GoogleAuthButton from "./GoogleAuthButton";

const NUM_PARTICLES = 20;
const NUM_NODES = 6;

const FindSimranLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const [nodes, setNodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

   
    setParticles(
      Array.from({ length: NUM_PARTICLES }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${2 + Math.random() * 2}s`
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

     
      <nav className="relative z-10 px-6 py-4 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-black-600 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              DevTalks
            </span>
          </div>
              <div className="flex items-center space-x-4">

  <button
    onClick={() => navigate('/login')}
    className="relative px-6 py-3 text-white bg-gray-900 rounded-xl font-medium text-lg overflow-hidden
               before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-transparent 
               before:transition-all before:duration-300 hover:before:border-gradient-to-r hover:before:from-blue-500 hover:before:to-purple-600
               hover:before:bg-gray-800/80 shadow hover:shadow-md transition-all duration-300"
  >
    <span className="relative z-10">Login</span>
  </button>

 
  <button
    onClick={() => navigate('/signup')}
    className="relative px-7 py-3 text-white bg-gray-900 rounded-xl font-semibold text-lg overflow-hidden
               before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-transparent 
               before:transition-all before:duration-300 hover:before:border-gradient-to-r hover:before:from-blue-500 hover:before:to-purple-600
               hover:before:bg-gray-800/80 shadow hover:shadow-md transition-all duration-300"
  >
    <span className="relative z-10">Sign Up</span>
  </button>
</div>
        </div>
      </nav>

  
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Stop Coding</span><br/>
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Alone.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-lg">
              DevTalks is the platform for engineering students in India to find partners, build projects, and grow their network.
            </p>

          </div>

    
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="relative h-80 flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  {nodes.map((n, i) => (
                    <div
                      key={i}
                      className={`absolute w-10 h-10 bg-gradient-to-r ${n.color} rounded-full flex items-center justify-center`}
                      style={{
                        transform: `rotate(${i * 60}deg) translateX(80px) rotate(-${i * 60}deg)`,
                        animation: `float 3s ease-in-out infinite ${i * 0.5}s`
                      }}
                    >
                      {n.icon}
                    </div>
                  ))}
                </div>
              </div>

              {particles.map((p, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                  style={{
                    left: p.left,
                    top: p.top,
                    animationDelay: p.delay,
                    animationDuration: p.duration
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 bg-gray-800/30">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-white mb-6">
        Every Engineering Student's <span className="bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">Nightmare...</span>
      </h2>
      <p className="text-xl text-gray-300">Sound familiar? 🤔</p>
    </div>

    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Problem Stage */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-2xl">😤</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-300 mb-2">Frustrated Dev</h3>
                <div className="text-gray-300 text-sm">
                  No backend partner...
                </div>
              </div>
            </div>
            <div className="text-6xl text-red-400/50 animate-pulse">➡️</div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center animate-bounce delay-500">
                <span className="text-white text-2xl">😊</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-300 mb-2">Happy Builder</h3>
                <div className="text-gray-300 text-sm">
                  Found perfect match!
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
              <span className="text-blue-300 font-medium">DevTalks Magic ✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      <section className="relative z-10 px-6 py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Great Ideas Need <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Great Teams.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
              icon: <Code className="w-12 h-12" />,
              title: "Frontend Expert?",
              desc: "You're a great frontend dev, but you need a backend partner for your project.",
              color: "from-blue-500 to-cyan-500"
            }, {
              icon: <Users className="w-12 h-12" />,
              title: "Backend Pro?",
              desc: "You can build a solid API, but you need a designer to make it look professional.",
              color: "from-purple-500 to-pink-500"
            }, {
              icon: <Target className="w-12 h-12" />,
              title: "Great Idea?",
              desc: "You have the perfect project idea for your resume, but you can't build it alone.",
              color: "from-green-500 to-teal-500"
            }].map((item, index) => (
              <div key={index} className="group hover:scale-105 transition-transform duration-300">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 h-full text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 bg-gray-900">
  <div className="max-w-7xl mx-auto space-y-24">

 
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h3 className="text-4xl font-bold text-white mb-6">
          Find the Right Partner, <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Instantly.</span>
        </h3>
        <p className="text-xl text-gray-300 leading-relaxed">
          Our advanced search lets you filter by tech stack, experience level, location, 
          and even recent GitHub activity to find the perfect collaborator.
        </p>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
            <span className="text-gray-300">Tech Stack</span>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">React</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-sm">Node.js</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
            <span className="text-gray-300">Location</span>
            <span className="text-white">Delhi NCR</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
            <span className="text-gray-300">GitHub Activity</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>

 
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div className="lg:order-2">
        <h3 className="text-4xl font-bold text-white mb-6">
          Collaborate in <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">Real-Time.</span>
        </h3>
        <p className="text-xl text-gray-300 leading-relaxed">
          Once you connect, jump straight into planning with our built-in real-time chat 
          and one-on-one video calls powered by Agora.
        </p>
      </div>
      <div className="lg:order-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">A</div>
            <div className="bg-blue-500/20 p-3 rounded-lg max-w-xs">
              <p className="text-blue-100 text-sm">Hey! Ready to start on the frontend?</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 justify-end">
            <div className="bg-purple-500/20 p-3 rounded-lg max-w-xs">
              <p className="text-purple-100 text-sm">Yes! I've got the API endpoints ready</p>
            </div>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">P</div>
          </div>
          <div className="flex items-center justify-center p-4 bg-gray-700/50 rounded-xl">
            <Video className="w-6 h-6 text-green-400 mr-2" />
            <span className="text-green-300">Video Call Active</span>
          </div>
        </div>
      </div>
    </div>

  
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h3 className="text-4xl font-bold text-white mb-6">
          Discover Your Next <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">Mission.</span>
        </h3>
        <p className="text-xl text-gray-300 leading-relaxed">
          Don't have an idea? Browse the Idea Marketplace for projects posted by other students. 
          Have a great idea? Post it and recruit your team.
        </p>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
        <div className="space-y-4">
          {[
            { title: "E-commerce Mobile App", tech: "React Native + Firebase", members: "2/3" },
            { title: "AI Chat Bot", tech: "Python + TensorFlow", members: "1/2" },
            { title: "Social Media Dashboard", tech: "Next.js + MongoDB", members: "3/4" }
          ].map((project, idx) => (
            <div key={idx} className="p-4 bg-gray-700/50 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-semibold">{project.title}</h4>
                <span className="text-xs text-green-300 bg-green-500/20 px-2 py-1 rounded">{project.members}</span>
              </div>
              <p className="text-gray-400 text-sm">{project.tech}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

  
    
  </div>
</section>

   
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold text-white mb-6">
            Ready to Build Something <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Awesome?</span>
          </h2>
          <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
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
