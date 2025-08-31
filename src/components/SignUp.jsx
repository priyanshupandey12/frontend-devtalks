import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
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
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   
   try {
     const response = await axios.post(`${BASE_URL}/users/signup`, formData,
     {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.emailId,
        password: formData.password
     },
     
     {
       withCredentials: true
     })
    dispatch(login(response.data.data))
     .log(response.data.data)
   
       navigate('/login')
   

   } catch (error) {
     console.log(error)
   }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-102">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 mb-8 animate-pulse">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-200">First Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-red-400" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-700 focus:ring-red-500 focus:border-red-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-600 rounded-lg text-white placeholder-gray-400 transition-all duration-200"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-200">Last Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-700 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-600 rounded-lg text-white placeholder-gray-400 transition-all duration-200"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-purple-400" />
              </div>
              <input
                type="email"
                name="emailId"
                id="emailId"
                className="bg-gray-700 focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-600 rounded-lg text-white placeholder-gray-400 transition-all duration-200"
                placeholder="you@example.com"
                value={formData.emailId}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">Password</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-green-400" />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-700 focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-600 rounded-lg text-white placeholder-gray-400 transition-all duration-200"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;