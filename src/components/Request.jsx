
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addrequest, removerequest } from '../store/requestSlice';
import api from '../store/axios';
import { BASE_URL } from '../store/constant';
import { Target,  GraduationCap, Award, Check, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request.request);
  const [loadingRequests, setLoadingRequests] = useState({});

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -50, 
      scale: 0.9,
      transition: { duration: 0.3, ease: "easeIn" }
    },
    hover: { 
      scale: 1.02, 
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const reviewRequest = async (status, _id) => {
    setLoadingRequests(prev => ({ ...prev, [_id]: status }));
    try {
      await api.post(
        `${BASE_URL}/connection/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removerequest(_id));
      const message = status === 'accepted' ? 'Connection accepted!' : 'Request rejected.';
      toast.success(message, { 
        style: { 
          background: '#1f2937', 
          color: '#e5e7eb' 
        } 
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to process request.', { 
        style: { 
          background: '#1f2937', 
          color: '#e5e7eb' 
        } 
      });
    } finally {
      setLoadingRequests(prev => ({ ...prev, [_id]: null }));
    }
  };

  const fetchrequest = async () => {
    try {
      const res = await api.get(`${BASE_URL}/pending/viewrequest`, {
        withCredentials: true,
      });
      dispatch(addrequest(res.data));
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch requests.', { 
        style: { 
          background: '#1f2937', 
          color: '#e5e7eb' 
        } 
      });
    }
  };

  useEffect(() => {
    fetchrequest();
  }, [dispatch]);

  if (!requests?.data?.length) {
    return (
      <motion.div
        className="flex justify-center items-center h-[70vh] bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-2xl sm:text-3xl font-semibold text-gray-400"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          No Pending Requests ✨
        </motion.h1>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-10">
        <motion.h1 
          className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Pending Connection Requests
        </motion.h1>

        <AnimatePresence mode="wait">
          <motion.div 
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            {requests.data.map((request) => {
              const user = request.fromuserId;
              const isLoading = loadingRequests[request._id];

              return (
                <motion.div
                  key={request._id}
                  className="bg-gray-950 rounded-2xl p-5 shadow-lg border border-gray-800 hover:shadow-2xl transition-all duration-300"
                  variants={cardVariants}
                  whileHover="hover"
                  exit="exit"
                >
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    {user?.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt={`${user?.firstName} ${user?.lastName}`}
                        className="w-16 h-16 rounded-full border-2 border-gray-800 object-cover hover:border-cyan-500 transition-colors duration-200"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-800">
                        <span className="text-xl font-bold text-gray-400">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </span>
                      </div>
                    )}
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-white">
                        {user?.firstName} {user?.lastName}
                      </h2>
                      {/* Adaptive Professional Headline */}
                      <div className="text-sm text-cyan-400 flex items-center gap-1.5">
                        {user?.educationYear === 'Graduate' && user?.yearsOfExperience > 0 ? (
                          <>
                            <Award className="w-4 h-4" />
                            <span>{user.userRole} • {user.yearsOfExperience} yrs</span>
                          </>
                        ) : (
                          <>
                            <GraduationCap className="w-4 h-4" />
                            <span>{user.educationYear} • {user.userRole}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-3 text-gray-300 text-xs sm:text-sm">
               

                

                    <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                      <label className="text-xs text-gray-400 font-semibold flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-pink-400" />
                        Goal
                      </label>
                      <p className="text-gray-200 text-sm font-medium">
                        {user?.primaryGoal || 'Not specified'}
                      </p>
                    </div>

                    <label className="text-xs text-gray-400 font-semibold mb-2 block">Top Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {user?.skills?.slice(0, 4).map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded-full border border-cyan-500/20">
                          {skill}
                        </span>
                      ))}
                      {user?.skills?.length > 4 && (
                        <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                          +{user.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 pt-4 border-t border-gray-800">
                    <div className="flex items-center justify-between gap-3">
                      <motion.button
                        onClick={() => reviewRequest('rejected', request._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-colors duration-200 border border-gray-700 disabled:opacity-50"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        disabled={isLoading}
                      >
                        {isLoading === 'rejected' ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        {isLoading === 'rejected' ? 'Rejecting...' : 'Reject'}
                      </motion.button>
                      <motion.button
                        onClick={() => reviewRequest('accepted', request._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg shadow-green-500/20 border border-green-600 disabled:opacity-50"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        disabled={isLoading}
                      >
                        {isLoading === 'accepted' ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                        {isLoading === 'accepted' ? 'Accepting...' : 'Accept'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Request;