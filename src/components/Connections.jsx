
import  { useEffect, useState } from 'react';
import api from '../store/axios';
import { BASE_URL } from '../store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addconnections, updateConnectionStatus } from '../store/connectionSlice';
import { Link } from 'react-router-dom';
import { useSocket } from './SocketContext';
import { Search, Filter, X, ChevronDown, MessageCircle, Clock ,Loader2} from 'lucide-react';
import toast from 'react-hot-toast';

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsData = useSelector((store) => store.connections.connections);
  const [error, setError] = useState(null);
  const { socket } = useSocket();
const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchName);
  const [selectedSkills, setSelectedSkills] = useState('');
  const [lastActive, setLastActive] = useState('');
  const [sortBy, setSortBy] = useState('firstName');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchName);
      setPage(1); 
    }, 500); 

  
    return () => {
      clearTimeout(handler);
    };
  }, [searchName]);

useEffect(() => {
   fetchConnections();
}, [dispatch, debouncedSearch, selectedSkills, lastActive, sortBy, order, page]);

  const fetchConnections = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
     if (debouncedSearch) params.append('searchName', debouncedSearch);
      if (selectedSkills) params.append('skills', selectedSkills);
      if (lastActive) params.append('lastActive', lastActive);
      params.append('sort', sortBy);
      params.append('order', order);
      params.append('page', page);
      params.append('limit', limit);

      const res = await api.get(`${BASE_URL}/pending/acceptconnection?${params.toString()}`, {
        withCredentials: true,
      });
      
      dispatch(addconnections(res.data));
      setTotalConnections(res.data.total || 0);
      if (error) setError(null);
    } catch (error) {
     const errorMsg = error.response?.data?.error || "Failed to fetch connections.";
      
      if (!connectionsData?.data?.length) {
        setError(errorMsg);
      } else {
    
        toast.error(errorMsg);
      }
    } finally {
    
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!socket) return;

    const handleConnectionsStatus = (statusMap) => {
      for (const [userId, isOnline] of Object.entries(statusMap)) {
        dispatch(updateConnectionStatus({ userId, isOnline }));
      }
    };
    socket.on('connections_status', handleConnectionsStatus);

    const handleStatusUpdate = ({ userId, isOnline }) => {
      dispatch(updateConnectionStatus({ userId, isOnline }));
    };
    socket.on('user_status_update', handleStatusUpdate);

    return () => {
      socket.off('connections_status', handleConnectionsStatus);
      socket.off('user_status_update', handleStatusUpdate);
    };
  }, [socket, dispatch]);

  const clearFilters = () => {
    setSearchName('');
    setSelectedSkills('');
    setLastActive('');
    setSortBy('firstName');
    setOrder('asc');
    setPage(1);
  };

  const hasActiveFilters = searchName || selectedSkills || lastActive || sortBy !== 'firstName' || order !== 'asc';

if (error) {
 return (
 <div className='flex items-center justify-center min-h-screen bg-gray-900'>
 <div className='bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md'>
 <h1 className='text-xl font-semibold text-red-400'>Error: {error}</h1>
 </div>
 </div>
 );
 }


 if (loading && !connectionsData?.data) {
return (
 <div className='flex items-center justify-center min-h-screen bg-gray-900'>
 <div className='text-center'>
 <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4'></div>
          <h1 className='text-xl text-gray-300'>Loading connections...</h1>
 </div>
 </div>
);
 }

  const connections = connectionsData.data || [];
  const totalPages = Math.ceil(totalConnections / limit);


  function formatLastActive(dateString) {
  if (!dateString) return '';
  const lastLogin = new Date(dateString);
  const now = new Date();

  const isToday =
    lastLogin.getDate() === now.getDate() &&
    lastLogin.getMonth() === now.getMonth() &&
    lastLogin.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    lastLogin.getDate() === yesterday.getDate() &&
    lastLogin.getMonth() === yesterday.getMonth() &&
    lastLogin.getFullYear() === yesterday.getFullYear();

  const options = { hour: '2-digit', minute: '2-digit' };

  if (isToday) return `Today at ${lastLogin.toLocaleTimeString([], options)}`;
  if (isYesterday) return `Yesterday at ${lastLogin.toLocaleTimeString([], options)}`;

 
  return `${lastLogin.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })} at ${lastLogin.toLocaleTimeString([], options)}`;
}


  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950'>
      <div className='max-w-6xl mx-auto px-4 py-8'>

        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white mb-2'>My Connections</h1>
          <p className='text-gray-400'>Manage and connect with your network ({totalConnections} total)</p>
        </div>

     
        <div className='bg-gray-800 rounded-xl p-4 mb-6 shadow-lg border border-gray-700'>
          <div className='flex flex-col md:flex-row gap-4'>
        
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
 type='text'
placeholder='Search by name...'
 value={searchName}
onChange={(e) => {
                
setSearchName(e.target.value);
 }}
 className='w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
 />
            </div>

        
            <button
              onClick={() => setShowFilters(!showFilters)}
              className='flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors border border-gray-600'
            >
              <Filter className='w-5 h-5' />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className='bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>!</span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className='flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors'
              >
                <X className='w-5 h-5' />
                <span>Clear</span>
              </button>
            )}

                 {loading && (
            <div className='flex items-center justify-center px-4'>
              <Loader2 className='w-5 h-5 text-cyan-500 animate-spin' />
            </div>
          )}
        
          </div>

     

      
          {showFilters && (
            <div className='mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4'>
       
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Skills</label>
                <input
                  type='text'
                  placeholder='e.g., React, Node.js'
                  value={selectedSkills}
                  onChange={(e) => {
                    setSelectedSkills(e.target.value);
                    setPage(1);
                  }}
                  className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500'
                />
              </div>

        
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Last Active</label>
                <select
                  value={lastActive}
                  onChange={(e) => {
                    setLastActive(e.target.value);
                    setPage(1);
                  }}
                  className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500'
                >
                  <option value=''>All time</option>
                  <option value='1'>Last 24 hours</option>
                  <option value='7'>Last 7 days</option>
                  <option value='30'>Last 30 days</option>
                  <option value='90'>Last 90 days</option>
                </select>
              </div>

         
              <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>Sort By</label>
                <div className='flex gap-2'>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className='flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500'
                  >
                    <option value='firstName'>Name</option>
                    <option value='lastLogin'>Last Active</option>
                    <option value='skills'>Skills</option>
                  </select>
                  <button
                    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                    className='px-3 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-white transition-colors'
                    title={order === 'asc' ? 'Ascending' : 'Descending'}
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform ${order === 'desc' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

  
        {!loading && connections.length === 0 ? (
          <div className='text-center py-16 bg-gray-800 rounded-xl border border-gray-700'>
            <div className='text-gray-400 mb-2'>
              <MessageCircle className='w-16 h-16 mx-auto mb-4 opacity-50' />
            </div>
            <h2 className='text-2xl font-semibold text-gray-300 mb-2'>No Connections Found</h2>
            <p className='text-gray-500'>Try adjusting your filters or connect with more people</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {connections.map((connection) => (
              <div
                key={connection._id}
                className='bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-700 hover:border-gray-600'
              >
                <div className='flex flex-col md:flex-row items-start p-6 gap-6'>
              
                  <div className='flex-shrink-0'>
                 <div className='relative w-24 h-24'>
  {connection?.photoUrl ? (
    <img
      className='w-24 h-24 rounded-full object-cover border-4 border-gray-700 hover:border-cyan-500 transition-all duration-300'
      src={connection.photoUrl}
      alt={`${connection.firstName} ${connection.lastName}`}
    />
  ) : (
    <div className='w-24 h-24 rounded-full flex items-center justify-center bg-gray-700 text-white font-bold text-xl border-4 border-gray-700'>
      {`${connection.firstName?.[0] || ''}${connection.lastName?.[0] || ''}`}
    </div>
  )}
</div>
                  </div>

          
                 <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-3 mb-1'>
            <h2 className='text-2xl font-bold text-white truncate'>
              {connection.firstName} {connection.lastName}
            </h2>
          </div>

              <div className='flex items-center gap-2 text-cyan-400 text-sm font-medium mb-3'>
            <span>{connection.userRole}</span>
            {connection.educationYear && <span>•</span>}
            {connection.educationYear === 'Graduate' && connection.yearsOfExperience > 0 ? (
                <span>{connection.yearsOfExperience} yrs exp</span>
            ) : (
                <span>{connection.educationYear}</span>
            )}
          </div>

                 {connection.primaryGoal && (
            <div className='mb-4'>
                <span className='inline-flex items-center gap-2 px-3 py-1 bg-gray-700 text-gray-300 text-xs font-semibold rounded-full'>
                    Goal: {connection.primaryGoal}
                </span>
            </div>
          )}

              {connection.skills && (
            <div className='flex flex-wrap gap-2 mb-4'>
              {connection.skills.slice(0, 4).map((skill, idx) => ( 
                <span key={idx} className='px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full'>
                  {skill.trim()}
                </span>
              ))}
            </div>
          )}   
 
                      {connection.lastLogin &&  (
            <div className='flex items-center gap-2 text-gray-500 text-xs'>
              <Clock className='w-3 h-3' />
              <span>Last active: {formatLastActive(connection.lastLogin)}</span>
            </div>
          )}

           

               

                
                  </div>

          
                  <div className='flex flex-row md:flex-col gap-2 w-full md:w-auto'>
                     <Link to={`/chat/${connection._id}`} className='flex-1 md:flex-none'>
                <button className='w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium shadow-lg hover:shadow-cyan-500/50'>
                    <MessageCircle className='w-4 h-4' />
                    Chat
                </button>
            </Link>
                    {/* <button
                      onClick={() => handleCallClick(connection)}
                      className='flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors font-medium border border-gray-600'
                    >
                      <Phone className='w-4 h-4' />
                      Call
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        {totalPages > 1 && (
          <div className='flex items-center justify-center gap-2 mt-8'>
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className='px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-600'
            >
              Previous
            </button>
            
            <div className='flex items-center gap-2'>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg transition-colors border ${
                      page === pageNum
                        ? 'bg-cyan-500 text-white border-cyan-500'
                        : 'bg-gray-700 text-white hover:bg-gray-600 border-gray-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages || loading}
              className='px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-600'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;