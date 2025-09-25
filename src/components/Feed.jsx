import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addfeed } from '../store/feedSlice';
import FilterModal from './FilterModal';
import UserCard from './UserCard';
import { Filter, X, Sparkles, Users, Target, Search, RefreshCw, AlertCircle } from 'lucide-react';
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed.feed);
  console.log(feed)
 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
   const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    skills: [],
    experienceLevel: [],
    activeWindow: '',
    locationRadius: '',
    primaryGoal: [],
    hoursPerWeek: '',
    useAdvancedFilters: false
  });


  const getfeed = async (appliedFilters = filters) => {
    try {
      setIsLoading(true);
      setError(null);

       const queryParams = new URLSearchParams();
      
      if (appliedFilters.useAdvancedFilters) {
        queryParams.append('useAdvancedFilters', 'true');
        
        if (appliedFilters.skills.length > 0) {
          queryParams.append('skills', appliedFilters.skills.join(','));
        }
        
        if (appliedFilters.experienceLevel.length > 0) {
          queryParams.append('experienceLevel', appliedFilters.experienceLevel.join(','));
        }
        
        if (appliedFilters.activeWindow) {
          queryParams.append('activeWindow', appliedFilters.activeWindow);
        }
        
        if (appliedFilters.locationRadius) {
          queryParams.append('locationRadius', appliedFilters.locationRadius);
        }
        
        if (appliedFilters.primaryGoal.length > 0) {
          queryParams.append('primaryGoal', appliedFilters.primaryGoal.join(','));
        }
        
        if (appliedFilters.hoursPerWeek) {
          queryParams.append('hoursPerWeek', appliedFilters.hoursPerWeek);
        }
      }

      const url = `${BASE_URL}/pending/choosingcard${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const res = await axios.get(url, {
        withCredentials: true
      });
      
   
    
      dispatch(addfeed(res?.data));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch user data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRequestHandled = () => {
  
    getfeed();
  };

    const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    getfeed(newFilters);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      skills: [],
      experienceLevel: [],
      activeWindow: '',
      locationRadius: '',
      primaryGoal: [],
      hoursPerWeek: '',
      useAdvancedFilters: false
    };
    setFilters(clearedFilters);
    getfeed(clearedFilters);
  };

  const hasActiveFilters = filters.useAdvancedFilters && (
    filters.skills.length > 0 ||
    filters.experienceLevel.length > 0 ||
    filters.activeWindow ||
    filters.locationRadius ||
    filters.primaryGoal.length > 0 ||
    filters.hoursPerWeek
  );

 useEffect(() => {
    if (!feed || !feed.users || feed.users.length === 0) {
      getfeed();
    } else {
      setIsLoading(false);
    }
  }, []);


if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
     
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
      
      <div className="relative text-center space-y-8 p-8">
        <div className="relative">
        
          <div className="w-24 h-24 border-4 border-transparent border-t-cyan-400 border-r-blue-400 rounded-full animate-spin shadow-lg"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-purple-400 border-l-pink-400 rounded-full animate-spin animation-delay-150"></div>
          <div className="absolute inset-2 w-20 h-20 border-2 border-transparent border-t-white/20 rounded-full animate-spin animation-delay-300"></div>
        </div>
        
        <div className="space-y-4">
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent animate-pulse">
            Discovering Amazing Talent
          </div>
          <div className="text-lg text-slate-400 font-medium">
            Connecting you with the perfect collaborators
          </div>
          
       
          <div className="flex items-center justify-center space-x-2 pt-4">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce shadow-lg shadow-cyan-400/50"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce animation-delay-200 shadow-lg shadow-blue-400/50"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-400 shadow-lg shadow-purple-400/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-950 p-4">
      <div className="text-center max-w-lg relative">
     
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-pink-500/5 to-orange-500/5 rounded-3xl blur-xl"></div>
        
        <div className="relative bg-gradient-to-br from-slate-900/90 via-red-950/10 to-slate-900/90 backdrop-blur-xl border border-red-500/20 rounded-3xl p-10 shadow-2xl">
          <div className="mb-6">
            <div className="inline-flex p-4 bg-red-500/10 rounded-full mb-4">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-red-400 mb-3">Connection Lost</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">{error}</p>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="group px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/25 flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5 group-hover:animate-spin" />
            <span>Reconnect</span>
          </button>
        </div>
      </div>
    </div>
  );

  const users = feed && feed.users && Array.isArray(feed.users) ? feed.users : [];

   return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">

   
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-gray-800/70 border-b border-slate-700  ">
    
       

        <div className="relative p-6 ">
          <div className="flex items-center justify-between max-w-md mx-auto">
            
            <div className="flex items-center space-x-3">
              <div className="relative ">
               
                <div className="relative bg-cyan-500 p-2 rounded-full">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>

              <div className="space-y-0">
                <h1 className="text-2xl font-bold text-white">
                  Discover
                </h1>
                <p className="text-xs text-gray-400 font-medium tracking-wide">
                  Connect • Collaborate • Create
                </p>
              </div>
            </div>

         
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                  title="Clear filters"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              )}
              <button
                onClick={() => setShowFilters(true)}
                className={`p-2 rounded-full transition-colors ${
                  hasActiveFilters ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <Filter className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

      
          {hasActiveFilters && (
            <div className="max-w-md mx-auto mt-3 flex flex-wrap gap-2 text-xs">
              {filters.skills.length > 0 && (
                <span className="px-2 py-1 bg-blue-600 text-white rounded-full">
                  Skills: {filters.skills.length}
                </span>
              )}
              {filters.experienceLevel.length > 0 && (
                <span className="px-2 py-1 bg-green-600 text-white rounded-full">
                  Level: {filters.experienceLevel.join(', ')}
                </span>
              )}
              {filters.activeWindow && (
                <span className="px-2 py-1 bg-purple-600 text-white rounded-full">
                  Active: {filters.activeWindow}
                </span>
              )}
              {filters.locationRadius && (
                <span className="px-2 py-1 bg-orange-600 text-white rounded-full">
                  {filters.locationRadius}km
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      
      <div className="flex flex-col items-center space-y-8 p-4 mt-8">
        {users.length > 0 ? (
          <UserCard user={users[0]} onRequestHandled={handleRequestHandled} />
        ) : (
          <div className="text-center text-white mt-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold mb-2">No users found</h2>
            <p className="text-gray-400 mb-4">
              {hasActiveFilters
                ? "Try adjusting your filters to find more matches"
                : "Check back later for new profiles"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {showFilters && (
        <FilterModal
          filters={filters}
          onApply={handleApplyFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default Feed;