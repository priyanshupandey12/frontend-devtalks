
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../store/constant";
import { logout } from "../store/userSlice";
import api from "../store/axios";
import {
  Users,
  User,
  UserPlus,
  LogOut,
  Home,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const Header = () => {
  const user = useSelector((store) => store.user.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    navigate("/");
    dispatch(logout());
    try {
      await api.get(`${BASE_URL}/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout failed:", error);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const linkVariants = {
    initial: { y: 0 },
    hover: { y: -2 },
    tap: { y: 0 },
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <Link
              to="/feed"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
            >
              <Users className="h-7 w-7 text-gray-300" />
              <span className="text-xl font-bold text-white">
                DevTalks
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-10">
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/feed"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Home className="h-4 w-4" />
                <span>Feed</span>
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/connections"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Users className="h-4 w-4" />
                <span>Connections</span>
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <Link
                to="/request"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <UserPlus className="h-4 w-4" />
                <span>Requests</span>
              </Link>
            </motion.div>
          </div>

          <div className="flex items-center space-x-5">
            {user && (
              <div className="hidden lg:block text-gray-400 text-sm">
                Welcome back,{" "}
                <span className="text-white font-semibold">{user.firstName}</span>
              </div>
            )}

           {user && (
  <motion.div
    ref={dropdownRef}
    className="relative hidden md:block"
    onMouseEnter={() => setDropdownOpen(true)}
    onMouseLeave={() => setDropdownOpen(false)}
  >
    <motion.button
      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-800/50 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 p-0.5">
        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt={`${user.firstName || "Unknown"} ${user.lastName || "User"}`}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center rounded-full">
              <span className="text-white text-xs">
                {(user.firstName?.[0] || "U").toUpperCase()}
                {(user.lastName?.[0] || "").toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
      <span className="hidden md:block text-gray-400 text-sm">
        {user.firstName} {user.lastName}
      </span>
    </motion.button>

    {/* ✅ Dropdown only renders when open */}
    {dropdownOpen && (
      <motion.div
        variants={dropdownVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="absolute right-0 mt-1 w-64 bg-black/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50"
      >
        <motion.div
          variants={menuItemVariants}
          custom={0}
          className="p-4 border-b border-gray-700 flex items-center space-x-3"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 p-0.5">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={user.firstName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 text-gray-400" />
              )}
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-semibold truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-400 text-sm truncate">{user.emailId}</p>
          </div>
        </motion.div>

        <motion.div variants={menuItemVariants} custom={1} className="p-2">
          <Link
            to="/profile"
            className="flex items-center space-x-3 w-full px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </motion.div>

        <motion.div
          variants={menuItemVariants}
          custom={2}
          className="p-2 border-t border-gray-700"
        >
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </motion.div>
      </motion.div>
    )}
  </motion.div>
)}


            <motion.button
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800"
        >
          <Link
            to="/feed"
            className="block px-4 py-3 text-gray-400 hover:text-white border-b border-gray-800 transition-colors duration-200"
          >
            Feed
          </Link>
          <Link
            to="/connections"
            className="block px-4 py-3 text-gray-400 hover:text-white border-b border-gray-800 transition-colors duration-200"
          >
            Connections
          </Link>
          <Link
            to="/request"
            className="block px-4 py-3 text-gray-400 hover:text-white border-b border-gray-800 transition-colors duration-200"
          >
            Requests
          </Link>
          {user && (
            <>
              <Link
                to="/profile"
                className="block px-4 py-3 text-gray-400 hover:text-white border-b border-gray-800 transition-colors duration-200"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 border-b border-gray-800 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Header;