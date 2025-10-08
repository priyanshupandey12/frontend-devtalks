import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../store/axios';
import { BASE_URL } from '../store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addconnections,updateConnectionStatus } from '../store/connectionSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useSocket} from './SocketContext'
const Connections = () => {

  const dispatch = useDispatch();
  const connectionsData = useSelector((store) => store.connections.connections);

   const navigate = useNavigate();
   const currentUser = useSelector((store) => store.user);
  const [error, setError] = useState(null);

   const { socket } = useSocket();

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await api.get(`${BASE_URL}/pending/acceptconnection`, {
          withCredentials: true,
        });
        dispatch(addconnections(res.data));
      } catch (error) {
        console.error('Error fetching connections:', error);
        setError(error.message);
      }
    };

    fetchConnections();
  }, [dispatch]);

   const handleCallClick = (connection) => {
    if (!currentUser || !connection) return;

    
    const ids = [currentUser._id, connection._id];
    ids.sort();
    const channelName = ids.join('_');

   if (socket) {
      socket.emit("outgoing_call", { 
        to: connection._id, 
        from: currentUser,
        channelName 
      });
    } else {
      console.error("Socket not connected. Cannot make a call.");
      return;
    }

  
    navigate(`/video-call/${channelName}`);
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
 

  if (error) {
    return (
      <div className='text-center my-10'>
        <h1 className='text-3xl'>Error: {error}</h1>
      </div>
    );
  }

  if (!connectionsData) {
    return (
      <div className='text-center my-10'>
        <h1 className='text-3xl'>Loading connections...</h1>
      </div>
    );
  }

  const connections = connectionsData.data || [];

  if (connections.length === 0) {
    return (
      <div className='text-center my-10'>
        <h1 className='text-3xl'>No Connections</h1>
      </div>
    );
  }


  return (
    <div className='max-w-4xl mx-auto px-4 py-8 bg-gray-800 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-200 mb-8 text-center'>Connections</h1>
      <div className="space-y-6">
        {connections.map((connection) => (
         
          <div key={connection._id} className="bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="flex items-start p-6">
              <div className="flex-shrink-0">
                <img className="w-24 h-24 rounded-full object-cover border-2 border-gray-100 hover:border-blue-400 transition-colors duration-300" src={connection?.photoUrl} alt={`${connection.firstName} ${connection.lastName}`} />
              </div>
              <div className="ml-6 flex-1">
              
              <div className="flex items-center space-x-3 mb-2">
  <h2 className="text-xl font-bold text-white">{connection.firstName} {connection.lastName}</h2>
  


</div>

                <div className="mb-3">
                  {connection.skills && (
                    <span className="inline-block px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-600 text-sm rounded-full">
                      {connection.skills}
                    </span>
                  )}
                </div>
                <p className="text-white text-sm leading-relaxed">{connection.description}</p>
              </div>
       <div className="flex flex-col space-y-2">
                  <Link to={`/chat/${connection._id}`}>
                    <button className='w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition'>Chat</button>
                  </Link>
                <button 
                  onClick={() => handleCallClick(connection)} 
                  className='w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition'
                >
                  Call
                </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
