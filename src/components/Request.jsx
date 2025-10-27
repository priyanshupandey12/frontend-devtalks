import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addrequest, removerequest } from '../store/requestSlice';
import api from '../store/axios';
import { BASE_URL } from '../store/constant';
import {  MapPin, Clock, Target, Briefcase, GraduationCap, Award, Check, X } from 'lucide-react';

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request.request);

  const reviewRequest = async (status, _id) => {
    try {
      await api.post(
        `${BASE_URL}/connection/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removerequest(_id));
      fetchrequest();
    } catch (error) {
      console.log(error);
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
    }
  };

  useEffect(() => {
    fetchrequest();
  }, []);

  if (!requests?.data?.length) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-400">
          No Pending Requests ✨
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
        Pending Connection Requests
      </h1>

      {/* Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {requests.data.map((request) => {
          const user = request.fromuserId;

          return (
            <div
              key={request._id}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 shadow-lg border border-gray-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              {/* Header */}
        <div className="flex items-center mb-4">
      <img
        src={user?.photoUrl}
        alt={user?.firstName}
        className="w-16 h-16 rounded-full border-2 border-gray-600 object-cover"
      />
      <div className="ml-4">
        <h2 className="text-xl font-semibold text-white">
          {user?.firstName} {user?.lastName}
        </h2>
        {/* NEW: Adaptive Professional Headline */}
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
              <div className="space-y-2 text-gray-300 text-xs sm:text-sm ">


           
    
      <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
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
            <span key={index} className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded-full">
              {skill}
            </span>
          ))}
          {user?.skills?.length > 4 && (
             <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
              +{user.skills.length - 4} more
            </span>
          )}
        </div>
      

             

             

             
              </div>

              {/* Buttons */}
             <div className="mt-6 pt-4 border-t border-gray-700">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => reviewRequest('rejected', request._id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
          Reject
        </button>
        <button
          onClick={() => reviewRequest('accepted', request._id)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg shadow-green-500/20"
        >
          <Check className="w-4 h-4" />
          Accept
        </button>
      </div>
    </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
