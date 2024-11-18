import React, { useState } from 'react';
import { Heart, X, Briefcase, MapPin } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removefeed } from '../store/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../store/constant';

const UserCard = ({ user , onRequestHandled }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handlerequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/connection/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      console.log('Response from handlerequest:', res);
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

  return (
    <div 
      className="relative w-80 h-96 bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-60" />
      <img
        src={user.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqiwrtc2R9MuIS83171xsgtTt81GddweP-g&s"}
        alt={`${user.firstName || 'Unknown'} ${user.lastName || 'User'}`}
        className="w-full h-full object-cover"
      />

    
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      
        <div className="mb-3">
          <h2 className="text-2xl font-bold tracking-wide">
            {user.firstName || 'Unknown'} {user.lastName || 'User'}
          </h2>
       
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
            onClick={() => handlerequest('ignored', user._id)}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-4 transform transition-all duration-300 hover:scale-110"
          >
            <X className="w-8 h-8 text-red-400" />
          </button>
          <button 
            onClick={() => handlerequest('Interested', user._id)}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-4 transform transition-all duration-300 hover:scale-110"
          >
            <Heart className="w-8 h-8 text-green-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;