import { MapPin, Briefcase, Target, Clock, Code, Github, Linkedin, Globe, User, GraduationCap, Building, BookOpen, Award } from 'lucide-react';

const ProfileView = ({ user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      

      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Profile
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          
       
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700/50 shadow-2xl sticky top-6">
              <div className="flex flex-col items-center">
       
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500/20 shadow-xl">
                 {user.photoUrl ? (
    <img
      src={user.photoUrl}
      alt={`${user.firstName || 'Unknown'} ${user.lastName || 'User'}`}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <span className="text-white text-3xl sm:text-4xl font-bold">
        {(user.firstName?.[0] || 'U').toUpperCase()}
        {(user.lastName?.[0] || '').toUpperCase()}
      </span>
    </div>
  )}
                  </div>
                </div>

           
                <h2 className="text-2xl font-bold text-white text-center mb-2">
                  {user?.firstName} {user?.lastName}
                </h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-medium">
                    {user?.userRole || 'Professional'}
                  </span>
                </div>

             
                <div className="w-full space-y-3">
                  {user?.location?.address && (
                    <div className="flex items-center gap-3 text-slate-300">
                      <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <span className="text-sm">{user.location.address}</span>
                    </div>
                  )}
                  {user?.experienceLevel && (
                    <div className="flex items-center gap-3 text-slate-300">
                      <Target className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <span className="text-sm capitalize">{user.experienceLevel}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

      
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
       
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">First Name</label>
                  <p className="text-white text-lg font-medium">{user?.firstName || 'Not provided'}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Name</label>
                  <p className="text-white text-lg font-medium">{user?.lastName || 'Not provided'}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gender</label>
                  <p className="text-white text-lg font-medium capitalize">{user?.gender || 'Not provided'}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Professional Role</label>
                  <p className="text-white text-lg font-medium capitalize">{user?.userRole || 'Not provided'}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Skill Level</label>
                  <p className="text-white text-lg font-medium capitalize">{user?.experienceLevel || 'Not provided'}</p>
                </div>

        
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
    <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
    Education & Experience
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
    
    {/* Education Year */}
    {user?.educationYear && (
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          Education Level
        </label>
        <p className="text-white text-lg font-medium">{user.educationYear}</p>
      </div>
    )}

    {/* Years of Experience (Conditional) */}
    {user?.educationYear === 'Graduate' && user?.yearsOfExperience > 0 && (
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4" />
          Years of Experience
        </label>
        <p className="text-white text-lg font-medium">
          {user.yearsOfExperience} {user.yearsOfExperience === 1 ? 'Year' : 'Years'}
        </p>
      </div>
    )}
    
    {/* College Name */}
    {user?.collegeName && (
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Building className="w-4 h-4" />
          College/University
        </label>
        <p className="text-white text-lg font-medium">{user.collegeName}</p>
      </div>
    )}

    {/* Field of Study */}
    {user?.fieldOfStudy && (
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Field of Study
        </label>
        <p className="text-white text-lg font-medium">{user.fieldOfStudy}</p>
      </div>
    )}

  </div>
</div>

         
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                Skills & Goals
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Skills
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(user?.skills) && user.skills.length > 0 ? (
                      user.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400">No skills listed</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Primary Goal
                  </label>
                  <p className="text-white text-lg leading-relaxed">{user?.primaryGoal || 'No primary goal set'}</p>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</label>
                  <p className="text-slate-300 text-base leading-relaxed">{user?.description || 'No description provided'}</p>
                </div>
              </div>
            </div>

        
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                Social Links
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="group">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub
                  </label>
                  {user?.links?.githubUsername ? (
                    <a 
                      href={`https://github.com/${user.links.githubUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all text-blue-400 hover:text-blue-300"
                    >
                      <span className="truncate">{user.links.githubUsername}</span>
                    </a>
                  ) : (
                    <p className="text-slate-500">Not provided</p>
                  )}
                </div>

                <div className="group">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </label>
                  {user?.links?.linkedin ? (
                    <a 
                      href={user.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all text-blue-400 hover:text-blue-300"
                    >
                      View Profile
                    </a>
                  ) : (
                    <p className="text-slate-500">Not provided</p>
                  )}
                </div>

                <div className="group">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Portfolio
                  </label>
                  {user?.links?.portfolio ? (
                    <a 
                      href={user.links.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all text-blue-400 hover:text-blue-300"
                    >
                      Visit Website
                    </a>
                  ) : (
                    <p className="text-slate-500">Not provided</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;