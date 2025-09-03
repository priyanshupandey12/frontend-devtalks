


const ProfileView = ({ user }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
    
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <h1 className="text-2xl font-semibold">Profile</h1>
      </div>


      <div className="p-6">
        <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
          
    
          <div className="col-span-12 lg:col-span-3">
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-32 h-32 bg-slate-700 rounded-full mb-4 overflow-hidden">
                {user?.photoUrl ? (
                  <img 
                    src={user.photoUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M17 9H14.5L12 6.5L9.5 9H7V7.5L9.5 5L12 7.5L14.5 5L17 7.5V9M8 12V14H16V12H8Z"/>
                    </svg>
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-center lg:text-left">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-slate-400 text-center lg:text-left">
                {user?.userRole || 'Professional'}
              </p>
            </div>
          </div>

       
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-6">
              
            
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">First Name</label>
                    <p className="text-white">{user?.firstName || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Last Name</label>
                    <p className="text-white">{user?.lastName || 'Not provided'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Gender</label>
                    <p className="text-white capitalize">{user?.gender || 'Not provided'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Location</label>
                    <p className="text-white">{user?.location?.address || 'Not provided'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Professional Role</label>
                    <p className="text-white capitalize">{user?.userRole || 'Not provided'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Commitment Level</label>
                <p className="text-white capitalize">
    {user?.commitment
      ? (() => {
          if (typeof user.commitment === "string") {
            return user.commitment;
          } else {
            const hours = user.commitment.hoursPerWeek?.trim()
              ? `${user.commitment.hoursPerWeek} hrs/week`
              : "N/A hrs/week";

            const duration = user.commitment.projectDuration?.trim()
              ? `${user.commitment.projectDuration} duration`
              : "N/A duration";

            return `${hours}, ${duration}`;
          }
        })()
      : "Not provided"}
  </p>
                  </div>
                </div>
              </div>

       
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Skills & Goals</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Skills</label>
                     <p className="text-white">
                              {Array.isArray(user?.skills) && user.skills.length > 0
                                       ? user.skills.join(", ")
                                        : "No skills listed"}
                                         </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Primary Goal</label>
                    <p className="text-white">{user?.primaryGoal || 'No primary goal set'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                    <p className="text-white">{user?.description || 'No description provided'}</p>
                  </div>
                </div>
              </div>

        
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Social Links</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">GitHub</label>
                    {user?.links?.githubUsername ? (
                      <a 
                        href={`https://github.com/${user.links.githubUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 break-all"
                      >
                        {user.links.githubUsername}
                      </a>
                    ) : (
                      <p className="text-white">Not provided</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">LinkedIn</label>
                    {user?.links?.linkedin ? (
                      <a 
                        href={user.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 break-all"
                      >
                        View Profile
                      </a>
                    ) : (
                      <p className="text-white">Not provided</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Portfolio</label>
                    {user?.links?.portfolio ? (
                      <a 
                        href={user.links.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 break-all"
                      >
                        Visit Website
                      </a>
                    ) : (
                      <p className="text-white">Not provided</p>
                    )}
                  </div>
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