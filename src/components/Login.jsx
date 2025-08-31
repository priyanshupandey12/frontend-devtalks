import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../store/constant';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [emailId, setemailId] = useState('');
  const [error, setError] = useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const handlelogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${BASE_URL}/users/login`,
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
    
       dispatch(login(response.data.user))

   
       if(response.status==200) {
          navigate('/feed')
       }
       
    
    }
     catch (err) {
      setError(err.response?.data);
      console.error('Login error:', err);
 
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-dark-900 to-gray-800">
      <div className="relative bg-gray-800 p-8 rounded-xl shadow-2xl w-96 max-w-md border border-gray-700">
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full opacity-50 blur-xl"></div>
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Welcome Back</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email-Id
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={emailId}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white pl-10"
                placeholder="Enter your email-id"
                onChange={(e)=>setemailId(e.target.value)}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white pl-10 pr-10"
                placeholder="Enter your password"
                onChange={(e)=>setPassword(e.target.value)}
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
          <p className="text-sm text-red-500">{error}</p>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={handlelogin}
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition duration-300 ease-in-out">Forgot password?</a>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 transition duration-300 ease-in-out">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;