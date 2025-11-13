
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSocket } from './SocketContext';
import api from '../store/axios';
import { BASE_URL } from '../store/constant';
import { ArrowLeft, Send } from 'lucide-react';

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
      const response = await api.get(`${BASE_URL}/chats/${userId}`, {
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
      console.error("Failed to fetch chat:", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [userId]);

  useEffect(() => {
    if (!socket || !loggedin) return;

    socket.emit('joinchat', { loggedin, userId });

    socket.on('messageDelivered', ({ firstName, text, senderId, _id, createdAt }) => {
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
    <div className="flex flex-col items-center bg-black min-h-screen px-4 py-6 text-gray-100">
      {/* HEADER */}
      <header className="w-full max-w-2xl flex items-center justify-between bg-black/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-gray-800/50">
        <div className="flex items-center space-x-3">
          <Link
            to="/connections"
            className="p-2 rounded-full hover:bg-gray-800/80 text-gray-300 hover:text-white transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          {recipient ? (
            <>
              <div className="relative">
                <img
                  src={recipient.photoUrl}
                  alt={recipient.firstName}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-700 shadow-md"
                />
                {isRecipientOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
                )}
              </div>
              <div className="ml-2">
                <h2 className="font-semibold text-base sm:text-lg text-white">
                  {recipient.firstName} {recipient.lastName}
                </h2>
                <p
                  className={`text-xs font-medium ${
                    isRecipientOnline ? 'text-green-400' : 'text-gray-400'
                  }`}
                >
                  {isRecipientOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </>
          ) : (
            <div className="ml-3">
              <h2 className="font-semibold text-white">Loading...</h2>
            </div>
          )}
        </div>
      </header>

 
      <div className="w-full max-w-2xl flex-1 bg-black/70 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 mt-6 overflow-y-auto h-[65vh] border border-gray-800/50 space-y-4 scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === loggedin ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`relative p-3 sm:p-4 rounded-2xl max-w-[75%] sm:max-w-[60%] break-words shadow-lg transition-all hover:shadow-xl ${
                msg.senderId === loggedin
                  ? 'bg-white text-black rounded-br-none'
                  : 'bg-white text-black rounded-bl-none border border-gray-300/50'
              }`}
            >
              <div className="text-sm sm:text-base leading-relaxed">{msg.text}</div>
              <div className={`text-[10px] mt-1.5 text-right ${
                msg.senderId === loggedin ? 'text-gray-600' : 'text-gray-600'
              }`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

    
      <div className="w-full max-w-2xl flex items-center mt-4 sm:mt-6 gap-2 sm:gap-3 bg-black/90 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-800/50 shadow-xl">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-white text-sm sm:text-base focus:outline-none placeholder-gray-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-white hover:bg-gray-100 text-black p-2.5 sm:p-3 rounded-full text-sm sm:text-base font-medium transition-all duration-200 shadow-lg hover:shadow-black/20 flex items-center justify-center"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Chat;