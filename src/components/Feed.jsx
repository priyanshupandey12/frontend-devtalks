
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addfeed } from '../store/feedSlice';
import FilterModal from './FilterModal';
import api from '../store/axios';
import UserCard from './UserCard';
import { Filter, X, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed.feed);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    skills: [],
    experienceLevel: [],
    activeWindow: '',
    locationRadius: '',
    primaryGoal: [],
    userRole: [],
    educationYear: [],
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
        
        if (appliedFilters.userRole.length > 0) {
          queryParams.append('userRole', appliedFilters.userRole.join(','));
        }
        if (appliedFilters.educationYear.length > 0) {
          queryParams.append('educationYear', appliedFilters.educationYear.join(','));
        }
      }

      const url = `${BASE_URL}/pending/choosingcard${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const res = await api.get(url, {
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
      userRole: [],
      educationYear: [],
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
    filters.userRole.length > 0 ||
    filters.educationYear.length > 0
  );

  useEffect(() => {
    if (!feed || !feed.users || feed.users.length === 0) {
      getfeed();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-800/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
      
      <div className="relative text-center space-y-8 p-8">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-transparent border-t-gray-400 border-r-gray-400 rounded-full animate-spin shadow-lg"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-gray-400 border-l-gray-400 rounded-full animate-spin animation-delay-150"></div>
          <div className="absolute inset-2 w-20 h-20 border-2 border-transparent border-t-white/20 rounded-full animate-spin animation-delay-300"></div>
        </div>
        
        <div className="space-y-4">
          <div className="text-3xl font-bold bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-clip-text text-transparent animate-pulse">
            Discovering Amazing Talent
          </div>
          <div className="text-lg text-gray-400 font-medium">
            Connecting you with the perfect collaborators
          </div>
          
          <div className="flex items-center justify-center space-x-2 pt-4">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce shadow-lg shadow-gray-400/50"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce animation-delay-200 shadow-lg shadow-gray-400/50"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce animation-delay-400 shadow-lg shadow-gray-400/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="text-center max-w-lg relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-gray-900/20 to-gray-900/20 rounded-3xl blur-xl"></div>
        
        <div className="relative bg-black/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 shadow-2xl">
          <div className="mb-6">
            <div className="inline-flex p-4 bg-gray-900/50 rounded-full mb-4">
              <AlertCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-300 mb-3">Connection Lost</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">{error}</p>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="group px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-gray-500/25 flex items-center space-x-2 mx-auto"
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-black/95 border-b border-white/10">
        <div className="relative p-4 sm:p-6">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="relative bg-gradient-to-br from-gray-700 to-gray-600 p-2.5 rounded-2xl shadow-lg shadow-gray-700/50 hover:shadow-gray-700/70 transition-all duration-300 hover:scale-110">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
              </div>

              <div className="space-y-0">
                <h1 className="text-xl sm:text-3xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                  Discover
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wider">
                  Connect <span className="text-gray-400">•</span> Collaborate <span className="text-gray-400">•</span> Create
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="p-2 sm:p-2.5 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg shadow-gray-700/30 hover:shadow-gray-700/50 group"
                  title="Clear filters"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>
              )}
              <button
                onClick={() => setShowFilters(true)}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg ${
                  hasActiveFilters 
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 shadow-gray-700/30 hover:shadow-gray-700/50' 
                    : 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 shadow-gray-700/20'
                }`}
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="max-w-md mx-auto mt-4 flex flex-wrap gap-2 text-xs animate-in fade-in slide-in-from-top-2 duration-300">
              {filters.skills.length > 0 && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full font-medium shadow-lg shadow-gray-700/30 backdrop-blur-sm border border-gray-600/30 hover:scale-105 transition-transform">
                  Skills: {filters.skills.length}
                </span>
              )}
              {filters.experienceLevel.length > 0 && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full font-medium shadow-lg shadow-gray-700/30 backdrop-blur-sm border border-gray-600/30 hover:scale-105 transition-transform">
                  Level: {filters.experienceLevel.join(', ')}
                </span>
              )}
              {filters.activeWindow && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full font-medium shadow-lg shadow-gray-700/30 backdrop-blur-sm border border-gray-600/30 hover:scale-105 transition-transform">
                  Active: {filters.activeWindow}
                </span>
              )}
              {filters.educationYear.length > 0 && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full font-medium shadow-lg shadow-gray-700/30 backdrop-blur-sm border border-gray-600/30 hover:scale-105 transition-transform">
                  Year: {filters.educationYear.join(', ')}
                </span>
              )}
              {filters.userRole.length > 0 && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full font-medium shadow-lg shadow-gray-700/30 backdrop-blur-sm border border-gray-600/30 hover:scale-105 transition-transform">
                  Role: {filters.userRole.join(', ')}
                </span>
              )}
              {filters.primaryGoal.length > 0 && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full font-medium shadow-lg shadow-gray-700/30 backdrop-blur-sm border border-gray-600/30 hover:scale-105 transition-transform">
                  Looking For: {filters.primaryGoal.join(', ')}
                </span>
              )}
              {filters.locationRadius && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full font-medium shadow-lg shadow-gray-700/30 backdrop-blur-sm border border-gray-600/30 hover:scale-105 transition-transform">
                  {filters.locationRadius}km
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center space-y-8 p-4 mt-8 relative z-10">
        {users.length > 0 ? (
          <UserCard user={users.slice(0, 3)} onRequestHandled={handleRequestHandled} />
        ) : (
          <div className="text-center text-white mt-12 sm:mt-20 animate-in fade-in zoom-in duration-500">
            <div className="relative inline-block mb-6">
              <div className="text-7xl sm:text-8xl mb-4 animate-bounce">🔍</div>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-gray-800/20 blur-3xl animate-pulse"></div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              No users found
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
              {hasActiveFilters
                ? "Try adjusting your filters to discover more amazing collaborators"
                : "Check back soon! New profiles are joining every day"}
            </p>
            
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-2xl shadow-gray-700/30 hover:shadow-gray-700/50 border border-gray-600/30"
              >
                Clear All Filters
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