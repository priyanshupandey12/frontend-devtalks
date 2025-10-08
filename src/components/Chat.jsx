import React, { useEffect, useState,useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSocket } from './SocketContext';
import api from '../store/axios';
import { BASE_URL } from '../store/constant';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const Chat = () => {
  const { userId } = useParams();
  const [recipient, setRecipient] = useState(null);
  const {user} = useSelector((store) => store.user);
  const loggedin = user ? user._id : null;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { socket } = useSocket();  
  const messagesEndRef = useRef(null);
     const [isRecipientOnline, setIsRecipientOnline] = useState(false);
  


  const fetchChat = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/chats/${userId}`, {
      withCredentials: true,
    });
    const chatData = response.data.data;


    const participantsMap = {};
    if (chatData.participants) {
      chatData.participants.forEach(p => {
        participantsMap[p._id] = p;
      });
    }

    
    const chatMessages = chatData.messages.map((msg) => {
      const senderInfo = participantsMap[msg.senderId];
      return {
        sender: senderInfo ? senderInfo.firstName : 'Unknown User',
        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: msg.text,
        senderId: msg.senderId,
        id: msg._id,
      };
    });
   

    setMessages(chatMessages);

 
    const otherUser = chatData.participants.find(p => p._id === userId);
    setRecipient(otherUser);

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchChat();
  }, [userId]);

  useEffect(() => {
    if (!socket || !loggedin) return;

    socket.emit('joinchat', { loggedin, userId });

    socket.on('messageDelivered', ({ firstName, text, senderId, _id,createdAt }) => {
       if (senderId === loggedin) return;
      const newMessage = {
        sender: firstName,
        time: new Date(createdAt || Date.now()).toLocaleTimeString(),
        text,
        senderId,
        id: _id || Date.now(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('messageDelivered'); 
    };
  }, [socket, loggedin, userId]);

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
        id: Date.now(),
      };

      setMessages((prevMessages) => [...prevMessages, newMsg]);


      socket.emit('sendmessage', messageToSend);
      setNewMessage('');
    }
  };

   useEffect(() => {
       
        if (!socket || !recipient) return;
    
   
        socket.emit('check_user_status', { userIdToCheck: recipient._id });

    }, [socket, recipient])

   useEffect(() => {
        if (!socket || !recipient) return;

        const handleStatusUpdate = ({ userId, isOnline }) => {
         
            if (userId === recipient._id) {
          
                setIsRecipientOnline(isOnline);
            }
        };

        socket.on('user_status_update', handleStatusUpdate);

        return () => {
            socket.off('user_status_update', handleStatusUpdate);
        };
    }, [socket, recipient]);

    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen p-4">
      <header className="w-full max-w-md flex items-center p-4 bg-gray-800 rounded-t-lg border-b border-gray-700">
  <Link to="/connections" className="p-2 rounded-full hover:bg-gray-700 text-white">
    <ArrowLeft />
  </Link>
  {recipient ? (
    <>
      <img src={recipient.photoUrl} alt={recipient.firstName} className="w-10 h-10 rounded-full ml-4" />
      <div className="ml-3">
        <h2 className="font-bold text-white">{recipient.firstName} {recipient.lastName}</h2>
        <p className={`text-xs font-semibold ${isRecipientOnline ? 'text-green-400' : 'text-gray-400'}`}>
                                {isRecipientOnline ? 'Online' : 'Offline'}
                            </p>
      </div>
    </>
  ) : (
    <div className="ml-3">
      <h2 className="font-bold text-white">Loading...</h2>
    </div>
  )}
</header>

      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-4 overflow-y-auto h-[65vh] space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === loggedin ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`chat-bubble ${msg.senderId === loggedin ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'} p-3 rounded-lg max-w-xs shadow-md`}
            >
              <div>{msg.text}</div>
              <div className="text-xs text-gray-300 mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
          <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex items-center w-full max-w-md space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered w-full max-w-xs text-gray-300 bg-gray-700 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-primary text-white px-6 py-2 rounded-full" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
