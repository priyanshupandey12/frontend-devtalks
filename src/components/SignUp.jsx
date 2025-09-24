import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../store/constant';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/users/signup`, formData, { withCredentials: true });
      dispatch(login(response.data.data));
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-4">
      <div className="bg-gray-800/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-lg transform transition-all duration-300 hover:scale-105">
        
 
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-10 animate-pulse">
            Join DevTalks
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['firstName', 'lastName'].map((field, i) => (
              <div key={i} className="relative">
                <input
                  type="text"
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field === 'firstName' ? "First Name" : "Last Name"}
                  required
                  className="peer w-full rounded-lg bg-gray-700 text-white placeholder-transparent border border-gray-600 px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
                <label
                  htmlFor={field}
                  className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-200 peer-focus:text-sm flex items-center gap-2"
                >
                  {field === 'firstName' ? <User size={16} className="text-purple-400" /> : <User size={16} className="text-pink-400" />}
                  {field === 'firstName' ? 'First Name' : 'Last Name'}
                </label>
              </div>
            ))}
          </div>

       
          <div className="relative">
            <input
              type="email"
              name="emailId"
              id="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="Email"
              required
              className="peer w-full rounded-lg bg-gray-700 text-white placeholder-transparent border border-gray-600 px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            <label
              htmlFor="emailId"
              className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-200 peer-focus:text-sm flex items-center gap-2"
            >
              <Mail size={16} className="text-blue-400" /> Email
            </label>
          </div>

       
          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="peer w-full rounded-lg bg-gray-700 text-white placeholder-transparent border border-gray-600 px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-200 peer-focus:text-sm flex items-center gap-2"
            >
              <Lock size={16} className="text-green-400" /> Password
            </label>
          </div>

       
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
