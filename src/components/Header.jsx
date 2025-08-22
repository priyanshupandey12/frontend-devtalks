import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../store/constant";
import { logout } from "../store/userSlice";
import {
  Users,
  User,
  UserPlus,
  Crown,
  LogOut,
  Bell,
  Home,
} from "lucide-react";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${BASE_URL}/users/logout`, {
        withCredentials: true,
      });
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Left: Logo */}
          <Link
            to="/feed"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Users className="h-7 w-7 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              DevTalks
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              to="/feed"
              className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Feed</span>
            </Link>
            <Link
              to="/connections"
              className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Connections</span>
            </Link>
            <Link
              to="/request"
              className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Requests</span>
            </Link>
          </div>

          {/* Right: User Section */}
          {user && (
            <div className="flex items-center space-x-5">
              {/* Welcome Message */}
              <div className="hidden lg:block text-gray-300 text-sm">
                Welcome back,{" "}
                <span className="text-cyan-400 font-semibold">
                  {user.firstName}
                </span>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      {user.photoUrl ? (
                        <img
                          src={user.photoUrl}
                          alt={user.firstName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <span className="hidden md:block text-gray-300 text-sm">
                    {user.firstName}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
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
                        <p className="text-gray-400 text-sm truncate">
                          {user.emailId}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 w-full px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-700/50 rounded-lg transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>

                    <Link
                      to="/premium"
                      className="flex items-center space-x-3 w-full px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-gray-700/50 rounded-lg transition-colors"
                    >
                      <Crown className="h-4 w-4" />
                      <span>Premium</span>
                    </Link>
                  </div>

                  <div className="p-2 border-t border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
