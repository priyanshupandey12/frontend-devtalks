import React, { useState } from 'react';
import { Heart, X, MapPin, Github, User, GraduationCap, BookOpen, Award } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removefeed } from '../store/feedSlice';
import axios from 'axios';
import api from '../store/axios';
import { BASE_URL } from '../store/constant';

const UserCard = ({ user, onRequestHandled }) => {
  console.log(user)
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const handlerequest = async (status, _id) => {
    try {
      const res = await api.post(
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


  return (
 <div className="relative w-full max-w-sm sm:w-96 h-auto min-h-[550px] sm:h-[600px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
  

  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
  
  {/* Profile Image */}
  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
    <div className="relative">
    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl ring-4 ring-blue-500/20">
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
      
     
<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-20">
  {user?.isGithubActive7d ? (
    <div className="relative group">
      <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-full border border-green-500/30 shadow-lg cursor-pointer">
        <Github className="w-3 h-3 text-green-400" />
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-green-500/30">
        Active on GitHub this week
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  ) : user?.isGithubActive3m ? (
    <div className="relative group">
      <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500/20 backdrop-blur-md rounded-full border border-yellow-500/30 shadow-lg cursor-pointer">
        <Github className="w-3 h-3 text-yellow-400" />
        <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-500/50"></div>
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-yellow-500/30">
        Active in last 3 months
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  ) : (
    <div className="relative group">
      <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-500/20 backdrop-blur-md rounded-full border border-gray-500/30 shadow-lg cursor-pointer">
        <Github className="w-3 h-3 text-gray-400" />
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl border border-gray-500/30">
        No recent GitHub activity
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  )}
</div>
    </div>
  </div>


  <div className="absolute top-40 sm:top-44 left-0 right-0 px-4 sm:px-6 text-center text-white">
    

    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
      {user.firstName || 'Unknown'} {user.lastName || 'User'}
    </h2>
    
    {user.educationYear === 'Graduate' && user.yearsOfExperience > 0 ? (
    <div className='mb-3'>
      <div className="flex items-center justify-center gap-2 mb-2 text-lg text-slate-300">
        <span className="font-semibold">{user.userRole}</span>
      </div>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
        <Award className="w-5 h-5 text-green-400" />
        <span className="text-green-300 font-bold text-base">
          {user.yearsOfExperience} {user.yearsOfExperience === 1 ? 'Year' : 'Years'} of Experience
        </span>
      </div>
    </div>
  ) : (

    <div className='mb-3'>
      <div className="flex items-center justify-center gap-2 mb-2 text-sm text-slate-400">
        <GraduationCap className="w-4 h-4" />
        <span>{user.educationYear || 'Student'}</span>
        {user.fieldOfStudy && <span>•</span>}
        <span>{user.fieldOfStudy}</span>
      </div>
      <div className="flex items-center justify-center px-2">
        <span className="text-xs sm:text-sm leading-relaxed">
          <span className="text-white font-semibold">{user.userRole}</span>
          <span className='text-gray-400 font-light'> looking for </span>
          <span className="text-blue-400 font-semibold">{user.primaryGoal}</span>
        </span>
      </div>
    </div>
  )}

        


     {user.location && formatLocation(user.location) && (
          <div className="flex items-center justify-center mb-4 text-xs sm:text-sm text-gray-400">
            <MapPin className="w-3 h-3 ... mr-1.5" />
            <span className="font-light">{formatLocation(user.location)}</span>
          </div>
        )}





    {user.skills && user.skills.length > 0 && (
      <div className="mb-4">
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-2">
          {user.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-white rounded-full border border-blue-400/30 backdrop-blur-sm hover:border-blue-400/50 hover:bg-blue-500/20 transition-all duration-300 shadow-lg"
            >
              {skill}
            </span>
          ))}
          {user.skills.length > 4 && (
            <span className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-bold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-blue-300 rounded-full border border-blue-400/40 backdrop-blur-sm shadow-lg">
              +{user.skills.length - 4}
            </span>
          )}
        </div>
      </div>
    )}

  
  </div>

 
  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 sm:space-x-6">
    <button 
      onClick={(e) => {
        e.stopPropagation();
        handlerequest('ignored', user._id);
      }}
      className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl border border-white/10 hover:shadow-red-500/20"
    >
      <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
    </button>
    
    <button 
      onClick={(e) => {
        e.stopPropagation();
        handlerequest('Interested', user._id);
      }}
      className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl shadow-teal-500/50 border border-white/20 hover:shadow-teal-400/60"
    >
      <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
    </button>
  </div>


  <button 
    onClick={() => setShowDetails(!showDetails)}
    className="absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg shadow-teal-500/30 border border-white/20"
  >
    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
  </button>


  {showDetails && (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 z-30 animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-5 sm:p-6 max-h-[500px] overflow-y-auto w-full border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white">Profile Details</h3>
          <button 
            onClick={() => setShowDetails(false)}
            className="text-gray-400 hover:text-white transition-colors hover:rotate-90 duration-300"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

          {user.collegeName && (
               <div className="mb-4 sm:mb-5">
                <h4 className="text-white ...">Education</h4>
                <p className="text-gray-300 ...">{user.collegeName}</p>
              </div>
            )}

              {user.description && (
              <div className="mb-4 sm:mb-5">
                <h4 className="text-white ...">About</h4>
                <p className="text-gray-300 ...">{user.description}</p>
              </div>
            )}
        

        {user.skills && user.skills.length > 0 && (
          <div className="mb-4 sm:mb-5">
            <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-xs sm:text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-gray-200 rounded-full border border-blue-400/30 backdrop-blur-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {user.primaryGoal && (
          <div className="mb-4 sm:mb-5">
            <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Goal</h4>
            <p className="text-gray-300 text-xs sm:text-sm">{user.primaryGoal}</p>
          </div>
        )}

         

        <div className="flex space-x-3 pt-4 sm:pt-5 border-t border-gray-700">
          <button 
            onClick={() => {
              handlerequest('ignored', user._id);
              setShowDetails(false);
            }}
            className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base shadow-lg"
          >
            Pass
          </button>
          <button 
            onClick={() => {
              handlerequest('Interested', user._id);
              setShowDetails(false);
            }}
            className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base shadow-lg shadow-teal-500/30"
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