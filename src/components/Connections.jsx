import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../store/axios';
import { BASE_URL } from '../store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addconnections, updateConnectionStatus } from '../store/connectionSlice';
import { Link } from 'react-router-dom';
import { useSocket } from './SocketContext';
import { Search, Filter, X, ChevronDown, MessageCircle, Clock, Loader2 } from 'lucide-react';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

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
      <motion.div
        className='flex items-center justify-center min-h-screen bg-black'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className='bg-black/70 border border-red-500 rounded-lg p-6 max-w-md backdrop-blur-sm'
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className='text-xl font-semibold text-red-400'>Error: {error}</h1>
        </motion.div>
      </motion.div>
    );
  }

  if (loading && !connectionsData?.data) {
    return (
      <motion.div
        className='flex items-center justify-center min-h-screen bg-black'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='text-center'>
          <motion.div
            className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4'
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h1 className='text-xl text-gray-300'>Loading connections...</h1>
        </div>
      </motion.div>
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

  const SkeletonFilterInput = () => (
    <div className="w-full h-10 bg-black/30 rounded-lg animate-pulse"></div>
  );

  const SkeletonFilterSelect = () => (
    <div className="w-full h-10 bg-black/30 rounded-lg animate-pulse"></div>
  );

  return (
    <motion.div
      className='min-h-screen bg-black text-white'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <motion.div className='mb-8' variants={itemVariants}>
          <h1 className='text-4xl font-bold text-white mb-2'>My Connections</h1>
          <p className='text-gray-400'>Manage and connect with your network ({totalConnections} total)</p>
        </motion.div>

        <motion.div
          className='bg-black/50 rounded-xl p-4 mb-6 shadow-lg border border-gray-800/50 backdrop-blur-sm'
          variants={itemVariants}
        >
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5' />
              <input
                type='text'
                placeholder='Search by name...'
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                }}
                className='w-full pl-10 pr-4 py-2.5 bg-black/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200'
              />
            </div>

            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className='flex items-center gap-2 px-4 py-2.5 bg-black/70 hover:bg-black/80 text-white rounded-lg transition-all duration-200 border border-gray-700'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className='w-5 h-5' />
              <span>Filters</span>
              {hasActiveFilters && (
                <motion.span
                  className='bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  !
                </motion.span>
              )}
            </motion.button>

            {hasActiveFilters && (
              <motion.button
                onClick={clearFilters}
                className='flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <X className='w-5 h-5' />
                <span>Clear</span>
              </motion.button>
            )}

            {loading && (
              <motion.div
                className='flex items-center justify-center px-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Loader2 className='w-5 h-5 text-cyan-500 animate-spin' />
              </motion.div>
            )}
          </div>

          {showFilters && (
            <motion.div
              className='mt-4 pt-4 border-t border-gray-800/50 grid grid-cols-1 md:grid-cols-3 gap-4'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              {loading ? (
                <>
                  <SkeletonFilterInput />
                  <SkeletonFilterSelect />
                  <div className='flex gap-2'>
                    <SkeletonFilterSelect style={{ flex: 1 }} />
                    <div className='w-12 h-10 bg-black/30 rounded-lg animate-pulse'></div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className='block text-sm font-medium text-gray-400 mb-2'>Skills</label>
                    <input
                      type='text'
                      placeholder='e.g., React, Node.js'
                      value={selectedSkills}
                      onChange={(e) => {
                        setSelectedSkills(e.target.value);
                        setPage(1);
                      }}
                      className='w-full px-3 py-2 bg-black/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-400 mb-2'>Last Active</label>
                    <select
                      value={lastActive}
                      onChange={(e) => {
                        setLastActive(e.target.value);
                        setPage(1);
                      }}
                      className='w-full px-3 py-2 bg-black/70 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200'
                    >
                      <option value=''>All time</option>
                      <option value='1'>Last 24 hours</option>
                      <option value='7'>Last 7 days</option>
                      <option value='30'>Last 30 days</option>
                      <option value='90'>Last 90 days</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-400 mb-2'>Sort By</label>
                    <div className='flex gap-2'>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className='flex-1 px-3 py-2 bg-black/70 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200'
                      >
                        <option value='firstName'>Name</option>
                        <option value='lastLogin'>Last Active</option>
                        <option value='skills'>Skills</option>
                      </select>
                      <motion.button
                        onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                        className='px-3 py-2 bg-black/70 hover:bg-black/80 border border-gray-700 rounded-lg text-white transition-all duration-200'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={order === 'asc' ? 'Ascending' : 'Descending'}
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${order === 'desc' ? 'rotate-180' : ''}`} />
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </motion.div>

        {!loading && connections.length === 0 ? (
          <motion.div
            className='text-center py-16 bg-black/50 rounded-xl border border-gray-800/50 backdrop-blur-sm'
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className='text-gray-500 mb-2' variants={iconVariants} initial="hidden" animate="visible">
              <MessageCircle className='w-16 h-16 mx-auto mb-4 opacity-50' />
            </motion.div>
            <h2 className='text-2xl font-semibold text-gray-300 mb-2'>No Connections Found</h2>
            <p className='text-gray-500'>Try adjusting your filters or connect with more people</p>
          </motion.div>
        ) : (
          <motion.div className='space-y-4' variants={containerVariants} initial="hidden" animate="visible">
            {connections.map((connection, index) => (
              <motion.div
                key={connection._id}
                className='bg-black/50 rounded-xl shadow-lg overflow-hidden border border-gray-800/50 backdrop-blur-sm'
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.05 }}
              >
                <div className='flex flex-col md:flex-row items-start p-6 gap-6'>
                  <motion.div className='flex-shrink-0' whileHover={{ scale: 1.05 }}>
                    <div className='relative w-24 h-24'>
                      {connection?.photoUrl ? (
                        <motion.img
                          className='w-24 h-24 rounded-full object-cover border-4 border-black/70 hover:border-cyan-500 transition-all duration-300'
                          src={connection.photoUrl}
                          alt={`${connection.firstName} ${connection.lastName}`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                      ) : (
                        <motion.div
                          className='w-24 h-24 rounded-full flex items-center justify-center bg-gray-900/50 text-white font-bold text-xl border-4 border-black/70'
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {`${connection.firstName?.[0] || ''}${connection.lastName?.[0] || ''}`}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

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
                      <motion.div className='mb-4' whileHover={{ scale: 1.02 }}>
                        <span className='inline-flex items-center gap-2 px-3 py-1 bg-black/70 text-gray-300 text-xs font-semibold rounded-full border border-gray-800/50'>
                          Goal: {connection.primaryGoal}
                        </span>
                      </motion.div>
                    )}

                    {connection.skills && (
                      <div className='flex flex-wrap gap-2 mb-4'>
                        {connection.skills.slice(0, 4).map((skill, idx) => (
                          <motion.span
                            key={idx}
                            className='px-3 py-1 bg-black/50 text-gray-300 text-xs rounded-full border border-gray-800/50'
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                            transition={{ duration: 0.2 }}
                          >
                            {skill.trim()}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {connection.lastLogin && (
                      <div className='flex items-center gap-2 text-gray-500 text-xs'>
                        <Clock className='w-3 h-3' />
                        <span>Last active: {formatLastActive(connection.lastLogin)}</span>
                      </div>
                    )}
                  </div>

                  <div className='flex flex-row md:flex-col gap-2 w-full md:w-auto'>
                    <Link to={`/chat/${connection._id}`} className='flex-1 md:flex-none'>
                      <motion.button
                        className='w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg font-medium shadow-lg hover:shadow-white/20 transition-all duration-200 border border-white'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageCircle className='w-4 h-4' />
                        Chat
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {totalPages > 1 && (
          <motion.div
            className='flex items-center justify-center gap-2 mt-8'
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className='px-4 py-2 bg-black/70 text-white rounded-lg hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-800/50'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Previous
            </motion.button>

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
                  <motion.button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 border ${
                      page === pageNum
                        ? 'bg-white text-black border-white'
                        : 'bg-black/70 text-white hover:bg-black/80 border-gray-800/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {pageNum}
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages || loading}
              className='px-4 py-2 bg-black/70 text-white rounded-lg hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-800/50'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Next
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Connections;