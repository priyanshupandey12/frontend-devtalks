import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createSocketConnection } from '../store/socket';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../store/constant';
import axios from 'axios';

const Chat = () => {
  const { userId } = useParams();
  const user = useSelector((store) => store.user);
  const loggedin = user ? user._id : null;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  const fetchChat = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/chats/${userId}`, {
        withCredentials: true,
      });

      const chatMessages = response?.data?.data.messages.map((msg) => ({
        sender: msg.senderId.firstName,
        time: msg.createdAt,
        text: msg.text,
        senderId: msg.senderId._id,
      }));

      setMessages(chatMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [userId]); 

  useEffect(() => {
    if (!loggedin) return;

    const socketInstance = createSocketConnection();
    setSocket(socketInstance);

    socketInstance.emit('joinchat', { loggedin, userId });

    socketInstance.on('messageDelivered', ({ firstName, text, senderId }) => {
      const newMessage = {
        sender: firstName,
        time: new Date().toLocaleTimeString(),
        text,
        senderId,
      };


      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg.text === newMessage.text && msg.senderId === newMessage.senderId)) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [loggedin, userId]);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      const messageToSend = {
        firstName: user.firstName,
        loggedin,
        userId,
        text: newMessage,
      };

     
      const newMsg = {
        sender: 'You',
        time: new Date().toLocaleTimeString(),
        text: newMessage,
        senderId: loggedin,
      };

  
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg.text === newMsg.text && msg.senderId === newMsg.senderId)) {
          return [...prevMessages, newMsg];
        }
        return prevMessages;
      });

   
      socket.emit('sendmessage', messageToSend);

      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen p-4">

      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <Link to="/connections">
          <button className="btn btn-primary text-white">
            Back
          </button>
        </Link>
        <img src={user?.photoUrl} alt="User " className="w-10 h-10 rounded-full" />
      </div>

 
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-4 overflow-y-auto h-[65vh] space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.senderId === loggedin ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`chat-bubble ${msg.senderId === loggedin ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'} p-3 rounded-lg max-w-xs shadow-md`}
            >
              <div>{msg.text}</div>
              <div className="text-xs text-gray-300 mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>


      <div className="mt-4 flex items-center w-full max-w-md space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered w-full max-w-xs text-gray-300 bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="btn btn-primary text-white px-6 py-2 rounded-full"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
