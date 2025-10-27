import React ,{useState}from "react";
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
} from "lucide-react";

const Header = () => {
  const user = useSelector((store) => store.user.user);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
   
      await api.get(`${BASE_URL}/users/logout`, {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
        
          <Link
            to="/feed"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Users className="h-7 w-7 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              DevTalks
            </span>
          </Link>

        
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

      
          <div className="flex items-center space-x-5">
         
            {user && (
              <div className="hidden lg:block text-gray-300 text-sm">
                Welcome back,{" "}
                <span className="text-cyan-400 font-semibold">{user.firstName}</span>
              </div>
            )}

          

           
            {user && (
              <div className="relative hidden md:block group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
{user.photoUrl ? (
  <img
    src={user.photoUrl}
    alt={`${user.firstName || 'Unknown'} ${user.lastName || 'User'}`}
    className="w-full h-full object-cover rounded-full"
  />
) : (
  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-full">
    <span className="text-white text-sm ">
      {(user.firstName?.[0] || 'U').toUpperCase()}
      {(user.lastName?.[0] || '').toUpperCase()}
    </span>
  </div>
)}
                    </div>
                  </div>
                  <span className="hidden md:block text-gray-300 text-sm">
                    {user.firstName}  {user.lastName} 
                  </span>
                </button>
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                  <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
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
                      <p className="text-gray-400 text-sm truncate">{user.emailId}</p>
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
            )}

        
            <button
              className="md:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
            </button>
          </div>
        </div>
      </div>

 
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <Link
            to="/feed"
            className="block px-4 py-3 text-gray-300 hover:text-cyan-400 border-b border-gray-800"
          >
            Feed
          </Link>
          <Link
            to="/connections"
            className="block px-4 py-3 text-gray-300 hover:text-cyan-400 border-b border-gray-800"
          >
            Connections
          </Link>
          <Link
            to="/request"
            className="block px-4 py-3 text-gray-300 hover:text-cyan-400 border-b border-gray-800"
          >
            Requests
          </Link>
          {user && (
            <>
              <Link
                to="/profile"
                className="block px-4 py-3 text-gray-300 hover:text-cyan-400 border-b border-gray-800"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 border-b border-gray-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
