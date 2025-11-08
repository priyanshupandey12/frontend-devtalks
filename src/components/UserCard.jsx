import React, { useState } from 'react';
import { Heart, X, MapPin, Github, User, GraduationCap, Award, Loader2 } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useDispatch } from 'react-redux';
import { removefeed } from '../store/feedSlice';
import api from '../store/axios';
import { BASE_URL } from '../store/constant';
import toast from 'react-hot-toast';

const UserCard = ({ user = [], onRequestHandled }) => {



  const top = user[0] || null;
  const mid = user[1] || null;
  const back = user[2] || null;

  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(null);


  const x = useMotionValue(0);

  const rotate = useTransform(x, (latest) => `${latest / 20}deg`);

  const handlerequest = async (status, _id) => {
    setLoadingState(status);
    try {
      const res = await api.post(
        `${BASE_URL}/connection/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
    
      dispatch(removefeed(_id));
      onRequestHandled();

      if (status === 'Interested') {
        toast.success('Connection request sent!');
      } else {
        toast.success('User removed from feed.');
      }

    } catch (error) {
      console.error("Failed to handle request:", error); 
      const message = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(message);
    } finally {
      setLoadingState(null);
    }
  };


  const handleDragEnd = (e, info) => {
    const offset = info.offset.x;
    const absOffset = Math.abs(offset);

    if (absOffset < 150) {
  
      animate(x, 0, {
        type: "spring",
        stiffness: 300,
        damping: 30
      });
    } else if (offset > 150) {

      animate(x, 500, {
        type: "spring",
        stiffness: 500,
        damping: 50
      });
      handlerequest("Interested", top._id);
    } else {
   
      animate(x, -500, {
        type: "spring",
        stiffness: 500,
        damping: 50
      });
      handlerequest("ignored", top._id);
    }
  };

  if (!top) {
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


  const CardContent = ({ user, showButtons = false, onDetailsClick = null, loadingState = null, handlerequest = null, className = '' }) => {
    return (
      <div className={`relative w-full h-full bg-black rounded-3xl overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
  
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl ring-4 ring-blue-500/20">
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={`${user.firstName || 'Unknown'}`}
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
                <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-full border border-green-500/30 shadow-lg">
                  <Github className="w-3 h-3 text-green-400" />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              ) : user?.isGithubActive3m ? (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500/20 backdrop-blur-md rounded-full border border-yellow-500/30 shadow-lg">
                  <Github className="w-3 h-3 text-yellow-400" />
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-500/20 backdrop-blur-md rounded-full border border-gray-500/30 shadow-lg">
                  <Github className="w-3 h-3 text-gray-400" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        </div>

      
        <div className="absolute top-40 sm:top-44 left-0 right-0 px-4 sm:px-6 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight">
            {user.firstName} {user.lastName}
          </h2>

          {user.educationYear === 'Graduate' && user.yearsOfExperience > 0 ? (
            <div className='mb-3'>
              <span className="text-lg text-slate-300">{user.userRole}</span>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20 mt-2">
                <Award className="w-5 h-5 text-green-400" />
                <span className="text-green-300 font-bold text-base">
                  {user.yearsOfExperience} {user.yearsOfExperience === 1 ? 'Year' : 'Years'}
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
              <span className="text-xs sm:text-sm text-gray-300">
                <span className="text-white font-semibold">{user.userRole}</span>{" "}
                looking for{" "}
                <span className="text-blue-400 font-semibold">{user.primaryGoal}</span>
              </span>
            </div>
          )}

          {user.location && formatLocation(user.location) && (
            <div className="flex items-center justify-center mb-4 text-xs sm:text-sm text-gray-400">
              <MapPin className="w-3 h-3 mr-1.5" />
              <span>{formatLocation(user.location)}</span>
            </div>
          )}

        
          {user.skills && user.skills.length > 0 && (
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {user.skills.slice(0, 4).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-white rounded-full border border-blue-400/30"
                >
                  {skill}
                </span>
              ))}
              {user.skills.length > 4 && (
                <span className="px-3 py-1 text-xs bg-purple-700/20 text-blue-200 rounded-full border border-purple-400/40">
                  +{user.skills.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

   
        {showButtons && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">


            <button
              onClick={(e) => { e.stopPropagation(); handlerequest('ignored', user._id); }}
              disabled={loadingState !== null}
              className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
            >
              {loadingState === 'ignored' ? (
                <Loader2 className="w-7 h-7 text-white animate-spin" />
              ) : (
                <X className="w-7 h-7 text-white" />
              )}
            </button>

      
            <button
              onClick={(e) => { e.stopPropagation(); handlerequest('Interested', user._id); }}
              disabled={loadingState !== null}
              className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
            >
              {loadingState === 'Interested' ? (
                <Loader2 className="w-7 h-7 text-white animate-spin" />
              ) : (
                <Heart className="w-7 h-7 text-white fill-white" />
              )}
            </button>
          </div>
        )}


        {onDetailsClick && (
          <button
            onClick={onDetailsClick}
            className="absolute top-4 right-4 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center"
          >
            <User className="w-5 h-5 text-white" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-sm sm:w-96 h-[600px] mx-auto">

  
      {back && (
        <motion.div
          className="absolute w-full h-full rounded-3xl overflow-hidden shadow-xl border border-white/5 scale-90 rotate-3 top-4 opacity-40 z-0 bg-black"
          animate={{ opacity: 0.4, scale: 0.9, rotate: 3 }}
        >
          <CardContent user={back} />
        </motion.div>
      )}

  
   {mid && (
  <motion.div
    className="absolute w-full h-full rounded-3xl overflow-hidden shadow-xl border border-white/10 top-2 z-10 bg-black"
    initial={{ scale: 0.97, opacity: 0.9, rotate: 0 }}
    animate={{ scale: 1, opacity: 1, rotate: 0 }}
    transition={{ duration: 0.25 }}
  >
    <CardContent user={mid} />
  </motion.div>
)}

    
      <motion.div
        drag={showDetails ? false : "x"}
        dragConstraints={false}
        style={{ x, rotate }}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.02 }}
        className="absolute w-full h-full shadow-2xl border border-white/10 z-20"
      >
        <CardContent 
          user={top} 
          showButtons={true} 
          onDetailsClick={() => setShowDetails(!showDetails)} 
          loadingState={loadingState} 
          handlerequest={handlerequest}
        />
      </motion.div>

   
      {showDetails && top && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-6 z-30">
          <div className="bg-gray-900 rounded-3xl p-6 w-full max-h-[500px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-white font-bold">Profile Details</h3>
              <button onClick={() => setShowDetails(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {top.collegeName && (
              <div className="mb-4">
                <h4 className="text-white mb-1">Education</h4>
                <p className="text-gray-300">{top.collegeName}</p>
              </div>
            )}

            {top.description && (
              <div className="mb-4">
                <h4 className="text-white mb-1">About</h4>
                <p className="text-gray-300">{top.description}</p>
              </div>
            )}

            {top.skills && (
              <div className="mb-4">
                <h4 className="text-white mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {top.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-blue-500/20 text-gray-200 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4 mt-4 border-t border-gray-700 pt-4">
              <button
                onClick={() => { handlerequest('ignored', top._id); setShowDetails(false); }}
                className="flex-1 bg-gray-700 py-3 text-white rounded-xl"
              >
                Pass
              </button>

              <button
                onClick={() => { handlerequest('Interested', top._id); setShowDetails(false); }}
                className="flex-1 bg-teal-600 py-3 text-white rounded-xl"
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