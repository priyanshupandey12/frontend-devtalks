import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from './SocketContext'; 
import { Phone, X } from 'lucide-react';

const CallNotification = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    if (!socket) return;

 
    const handleIncomingCall = (data) => {
    
      setIncomingCall(data);
    };

    socket.on('incoming_call', handleIncomingCall);

    
    return () => {
      socket.off('incoming_call', handleIncomingCall);
    };
  }, [socket]);

  const handleAccept = () => {
    if (!incomingCall) return;
    
    navigate(`/video-call/${incomingCall.channelName}`);
    setIncomingCall(null); 
  };

  const handleReject = () => {
   
   
    setIncomingCall(null); 
  };


  if (!incomingCall) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-6 w-96 animate-fade-in-up">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img 
            className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400" 
            src={incomingCall.from.photoUrl} 
            alt={incomingCall.from.firstName} 
          />
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold text-white">{incomingCall.from.firstName} {incomingCall.from.lastName}</h3>
          <p className="text-sm text-gray-300">is calling you...</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button onClick={handleReject} className="btn btn-circle bg-red-500 hover:bg-red-600 border-none">
          <X className="text-white" />
        </button>
        <button onClick={handleAccept} className="btn btn-circle bg-green-500 hover:bg-green-600 border-none">
          <Phone className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default CallNotification;