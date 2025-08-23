
import React, { useState } from 'react';
import { Heart, X, Briefcase, MapPin, Clock, Target, Activity, User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removefeed } from '../store/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../store/constant';

const UserCard = ({ user, onRequestHandled }) => {
  const [isHovered, setIsHovered] = useState(false);
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
      <div className="w-80 h-96 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-500">
        No user data available
      </div>
    );
  }

  const formatLocation = (location) => {
    if (!location?.address) return null;
    return location.address.split(',').slice(0, 2).join(', ');
  };

  const getActivityStatus = () => {
    if (user.isGithubActive7d) return { text: 'Active this week', color: 'bg-green-500' };
    if (user.isGithubActive3m) return { text: 'Active recently', color: 'bg-yellow-500' };
    return { text: 'Not recently active', color: 'bg-gray-500' };
  };

  const activityStatus = getActivityStatus();

  return (
    <div className="relative w-80 bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
    
      <div 
        className="relative h-96 overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-60" />
        <img
          src={user.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqiwrtc2R9MuIS83171xsgtTt81GddweP-g&s"}
          alt={`${user.firstName || 'Unknown'} ${user.lastName || 'User'}`}
          className="w-full h-full object-cover"
        />

      
        <div className="absolute top-4 right-4">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white ${activityStatus.color}`}>
            <Activity className="w-3 h-3" />
            <span>{activityStatus.text}</span>
          </div>
        </div>

     
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mb-3">
            <h2 className="text-2xl font-bold tracking-wide">
              {user.firstName || 'Unknown'} {user.lastName || 'User'}
            </h2>
            {user.experienceLevel && (
              <p className="text-sm opacity-90 font-medium">{user.experienceLevel} Developer</p>
            )}
            {user.location && formatLocation(user.location) && (
              <div className="flex items-center mt-1 text-sm opacity-80">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{formatLocation(user.location)}</span>
                {user.distance && (
                  <span className="ml-1">• {Math.round(user.distance / 1000)}km away</span>
                )}
              </div>
            )}
          </div>

          {/* Quick Info */}
          <div className="mb-4 space-y-2">
            {user.primaryGoal && (
              <div className="flex items-center text-sm">
                <Target className="w-4 h-4 mr-2" />
                <span>{user.primaryGoal}</span>
              </div>
            )}
            
            {user.commitment?.hoursPerWeek && (
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>{user.commitment.hoursPerWeek}</span>
              </div>
            )}
          </div>

 
          {user.skills && user.skills.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Briefcase className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {user.skills.length > 3 && (
                  <span className="px-3 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full">
                    +{user.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className={`flex justify-center space-x-6 transition-all duration-300 ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handlerequest('ignored', user._id);
              }}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-4 transform transition-all duration-300 hover:scale-110"
            >
              <X className="w-8 h-8 text-red-400" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handlerequest('Interested', user._id);
              }}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-4 transform transition-all duration-300 hover:scale-110"
            >
              <Heart className="w-8 h-8 text-green-400" />
            </button>
          </div>
        </div>
      </div>

    
      {showDetails && (
        <div className="bg-white border-t border-gray-200 p-6 space-y-4">
          {user.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <User className="w-4 h-4 mr-2" />
                About
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{user.description}</p>
            </div>
          )}

          {user.skills && user.skills.length > 3 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                All Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {user.commitment && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Commitment
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                {user.commitment.hoursPerWeek && (
                  <p>• Available {user.commitment.hoursPerWeek} per week</p>
                )}
                {user.commitment.projectDuration && (
                  <p>• Looking for {user.commitment.projectDuration} projects</p>
                )}
              </div>
            </div>
          )}

          <div className="flex space-x-4 pt-4 border-t border-gray-100">
            <button 
              onClick={() => handlerequest('ignored', user._id)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
            >
              Pass
            </button>
            <button 
              onClick={() => handlerequest('Interested', user._id)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors"
            >
              Connect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;