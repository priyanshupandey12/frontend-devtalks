
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';
import ProfileView from './ProfileView';

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-400"
        >
          Please log in to view your profile.
        </motion.p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black mt-10">
      <motion.div
        key={isEditing ? 'edit' : 'view'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isEditing ? (
          <EditProfile user={user} onCancel={() => setIsEditing(false)} />
        ) : (
          <ProfileView user={user} />
        )}
      </motion.div>

      {!isEditing && (
        <motion.button
          initial={{ scale: 0.95, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={() => setIsEditing(true)}
          className="fixed bottom-6 right-6 bg-white text-black px-6 py-3 rounded-full font-medium shadow-xl shadow-black/30 transition-all duration-200 flex items-center gap-2 z-50"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
          Edit Profile
        </motion.button>
      )}
    </div>
  );
};

export default Profile;