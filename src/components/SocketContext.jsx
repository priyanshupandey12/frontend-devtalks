
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../store/constant';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((store) => store.user.user); 


  useEffect(() => {

    if (user) {
      const newSocket = io(SOCKET_URL, {
        withCredentials: true,
         query: { userId: user._id }
      });
      setSocket(newSocket);
      
   
   

    
      return () => {
        newSocket.disconnect();
      };
    } else {
    
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};