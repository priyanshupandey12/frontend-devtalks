
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../store/axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../store/constant';
import GoogleAuthButton from "./GoogleAuthButton";
import {toast} from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [emailId, setEmailId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

 
    if (!emailId.trim() && !password.trim()) {
      toast.error("Please enter your email and password to continue.");
      return;
    }
    if (!emailId.trim()) {
      toast.error("Email address can’t be empty.");
      return;
    }
    if (!password.trim()) {
      toast.error("Password can’t be empty.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(
        `${BASE_URL}/users/login`,
        { emailId, password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );


      toast.success(`Welcome back, ${response.data.user.firstName || 'User'}!`);
      dispatch(login({ user: response.data.user }));
      navigate('/feed');

    } catch (err) {
   
   
      if (err.response && err.response.data) {
        const message = err.response.data.message || 'Unable to log in right now.';
        toast.error(message);
        setError(message);
      } 
      else if (err.request) {
        toast.error('Network error. Please check your internet connection.');
        setError('Network error. Please check your internet connection.');
      } 
      else {
        toast.error('Something went wrong. Please try again later.');
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900">

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Get Started Now</h2>
            <p className="text-gray-400">Enter your credentials to access your account</p>
          </div>

          <div className="mt-8">
            <GoogleAuthButton text="Login with Google" />
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-white">OR</span>
            </div>
          </div>

          {/* ✅ Wrapped inputs inside a proper <form> */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={emailId}
                  onChange={(e) => {
                    setEmailId(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={isLoading}
                  className="w-full px-4 py-2 pl-10 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={isLoading}
                  className="w-full px-4 py-2 pl-10 pr-10 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

        

          
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Don’t have an account?{' '}
              <Link to="/signup" className="font-medium text-purple-500 hover:text-purple-400">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <img
          src="/devtalks.png"
          alt="Login illustration"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover rounded-lg shadow-lg opacity-0 transition-opacity duration-500"
          onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
        />
      </div>
    </div>
  );
};

export default Login;
