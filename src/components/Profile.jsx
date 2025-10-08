import React,{useState} from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import ProfileView from './ProfileView';

const Profile = () => {
  const {user }= useSelector((store) => store.user);
  const [isEditing, setIsEditing] = useState(false);


  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p className="text-slate-400">Please log in to view your profile.</p>
      </div>
    );
  }


  if (isEditing) {
    return <EditProfile user={user} onCancel={() => setIsEditing(false)} />;
  }


  return (
    <div className="relative">
      <ProfileView user={user} />
      
      <button
        onClick={() => setIsEditing(true)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-200 flex items-center gap-2 z-50 hover:scale-105"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;