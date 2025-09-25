import React, { useState } from 'react';
import { Heart, X, MapPin, Calendar, Github, User, Building } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removefeed } from '../store/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../store/constant';

const UserCard = ({ user, onRequestHandled }) => {
  console.log(user)
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const handlerequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/connection/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
    
      dispatch(removefeed(_id));
      onRequestHandled();
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="w-80 h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
        No user data available
      </div>
    );
  }

  const formatLocation = (location) => {
    if (!location?.address) return null;
    return location.address.split(',').slice(0, 2).join(', ');
  };

  const getExperienceDisplay = () => {
    if (user.experienceLevel === 'Student') return 'Student';
    if (user.experienceLevel === 'Beginner') return 'Beginner';
    return user.experienceLevel || 'N/A';
  };

  return (
    <div className="relative w-96 h-[500px] bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
      
   
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
          <img
            src={user.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqiwrtc2R9MuIS83171xsgtTt81GddweP-g&s"}
            alt={`${user.firstName || 'Unknown'} ${user.lastName || 'User'}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

     
      <div className="absolute top-44 left-0 right-0 px-6 text-center text-white">
        <h2 className="text-2xl font-bold mb-1">
          {user.firstName || 'Unknown'} {user.lastName || 'User'}
        </h2>
        
        <div className="flex items-center justify-center mb-2">
          <span className="text-blue-400 font-medium text-sm">{getExperienceDisplay()}</span>
        </div>

        {user.location && formatLocation(user.location) && (
          <div className="flex items-center justify-center mb-4 text-sm text-gray-300">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{formatLocation(user.location)}</span>
          </div>
        )}

    
        {user.description && (
          <div className="mb-6 px-4">
            <p className="text-gray-300 text-sm leading-relaxed max-h-16 overflow-hidden">
              {user.description}
            </p>
          </div>
        )}

       
        {user.skills && user.skills.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-2">
              {user.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-gray-700 text-white rounded-full border border-gray-600"
                >
                  {skill}
                </span>
              ))}
              {user.skills.length > 4 && (
                <span className="px-3 py-1 text-xs font-medium bg-gray-700 text-white rounded-full border border-gray-600">
                  +{user.skills.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

       
<div className="mb-6 flex justify-center">
  <div className="flex items-center gap-10 text-gray-300">
    {/* Last 7 days */}
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center gap-1 text-sm">
        <Github className="w-4 h-4 shrink-0" />
        <span className="font-medium">{user?.githubActivity?.last7dCommits}</span>
      </div>
      <span className="text-xs text-gray-400">commits this week</span>
    </div>

   
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center gap-1 text-sm">
        <Github className="w-4 h-4 shrink-0" />
        <span className="font-medium">{user?.githubActivity?.last3mCommits}</span>
      </div>
      <span className="text-xs text-gray-400">commits last 3 months</span>
    </div>
  </div>
</div>

        {/* Building Projects Tag */}
        <div className="mb-8 flex justify-center">
          <div className="bg-blue-600 px-4 py-2 rounded-full text-sm font-medium">
            Building Projects
          </div>
        </div>
      </div>

 
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handlerequest('ignored', user._id);
          }}
          className="w-12 h-12 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handlerequest('Interested', user._id);
          }}
          className="w-12 h-12 bg-teal-500 hover:bg-teal-400 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <Heart className="w-6 h-6 text-white" />
        </button>
      </div>

    
      <button 
        onClick={() => setShowDetails(!showDetails)}
        className="absolute top-4 right-4 w-8 h-8 bg-teal-500 hover:bg-teal-400 rounded-full flex items-center justify-center transition-all duration-200"
      >
        <User className="w-4 h-4 text-white" />
      </button>

    
      {showDetails && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-gray-800 rounded-2xl p-6 max-h-[400px] overflow-y-auto w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Profile Details</h3>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {user.description && (
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">About</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{user.description}</p>
              </div>
            )}

            {user.skills && user.skills.length > 0 && (
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {user.primaryGoal && (
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Goal</h4>
                <p className="text-gray-300 text-sm">{user.primaryGoal}</p>
              </div>
            )}

            {user.commitment && (
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Availability</h4>
                <div className="space-y-1 text-sm text-gray-300">
                  {user.commitment.hoursPerWeek && (
                    <p>• {user.commitment.hoursPerWeek} per week</p>
                  )}
                  {user.commitment.projectDuration && (
                    <p>• Looking for {user.commitment.projectDuration} projects</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex space-x-3 pt-4 border-t border-gray-700">
              <button 
                onClick={() => {
                  handlerequest('ignored', user._id);
                  setShowDetails(false);
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors"
              >
                Pass
              </button>
              <button 
                onClick={() => {
                  handlerequest('Interested', user._id);
                  setShowDetails(false);
                }}
                className="flex-1 bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-xl font-medium transition-colors"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;