import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import api from '../store/axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../store/constant';
import GoogleAuthButton from "./GoogleAuthButton";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [emailId, setemailId] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post(`${BASE_URL}/users/login`,
        {
          emailId,
          password      
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    
       dispatch(login({ user: response.data.user, token: response.data.accessToken }));
   
       if(response.status==200) {
          navigate('/feed')
       }
    
    } catch (err) {
      setError(err.response?.data);
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900">
   
      <div className="flex-1 flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Get Started Now</h2>
            <p className="text-white-400">Enter your credentials to access your account</p>
          </div>

       
          <div className="mt-8">
            <GoogleAuthButton text="Login with Google" />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-white">OR</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={emailId}
                  onChange={(e) => setemailId(e.target.value)}
                   className="w-full px-4 py-2 pl-10 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your Email address"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-purple-500 hover:text-purple-400">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                   className="mt-1 w-full px-4 py-2 pl-10 pr-10 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your Password"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="button"
              onClick={handlelogin}
               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            >
              Login
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="/signup" className="font-medium text-purple-500 hover:text-purple-400">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

    
      <div className="flex-1  items-center justify-center p-8">
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