import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addfeed } from '../store/feedSlice';
import FilterModal from './FilterModal';
import UserCard from './UserCard';
import { Filter, X } from 'lucide-react';
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
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="text-red-400 text-xl">Error: {error}</div>
    </div>
  );

  const users = feed && feed.users && Array.isArray(feed.users) ? feed.users : [];

  return (

    <div className="min-h-screen bg-gray-800">
   
      <div className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-white">Discover</h1>
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
                hasActiveFilters 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              <Filter className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        
      
        {hasActiveFilters && (
          <div className="max-w-md mx-auto mt-3">
            <div className="flex flex-wrap gap-2 text-xs">
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
          </div>
        )}
      </div>


      <div className="flex flex-col items-center space-y-4 p-4">
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