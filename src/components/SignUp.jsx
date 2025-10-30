import React, { useState } from 'react';
import { User, Mail, Lock,Briefcase } from 'lucide-react';
import { BASE_URL } from '../store/constant';
import { useNavigate, Link  } from 'react-router-dom';
import api from '../store/axios';

const SignUp = () => {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    gender: '',         
   educationYear: '' ,
   yearsOfExperience: 0
  });

  const [errors, setErrors] = useState({});
  
  const [apiError, setApiError] = useState('');

const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevState => {
      const newState = { ...prevState, [name]: value };


      if (name === 'educationYear' && value !== 'Graduate') {
        newState.yearsOfExperience = 0;
      }
      
      return newState;
    });


    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});    
    setApiError('');  

    try {
      await api.post(`${BASE_URL}/users/signup`, formData, { withCredentials: true });
      navigate('/login'); 
      
    } catch (error) {

      if (error.response) {
     
        const { data } = error.response;
        
        if (data.errors) {
        
          setErrors(data.errors);
        
          setApiError(data.message || "Please fix the errors below.");
        } else {
    
          setApiError(data.message || 'An unknown server error occurred.');
        }
      } else {
    
        setApiError('Network error. Please check your connection and try again.');
      }
    }
  };

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800/70 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg transform transition-all duration-300">
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6 sm:mb-10">
          Join DevTalks
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4"> 
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['firstName', 'lastName'].map((field, i) => (
              <div key={i}> 
                <div className="relative">
                  <input
                    type="text"
                    name={field}
                    id={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field === 'firstName' ? "First Name" : "Last Name"}
                    required
                 
                    className={`peer w-full rounded-lg bg-gray-700 text-white placeholder-transparent mt-1 border ${
                      errors[field] ? 'border-red-500' : 'border-gray-600'
                    } px-10 pt-5 pb-2 focus:outline-none focus:ring-2 ${
                      errors[field] ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'
                    } transition-all duration-200`}
                  />
                  <label
                    htmlFor={field}
                    className="absolute left-3 top-2 text-gray-400 text-sm 
                    transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-200 peer-focus:text-sm flex items-center gap-3"
                  >
                    {field === 'firstName' ? <User size={16} className="text-purple-400" /> : <User size={16} className="text-pink-400" />}
                    {field === 'firstName' ? 'First Name' : 'Last Name'}
                  </label>
                </div>
             
                {errors[field] && (
                  <p className="text-red-400 text-xs mt-1 ml-1">{errors[field][0]}</p>
                )}
              </div>
            ))}
          </div>
          
      
          <div>
            <div className="relative">
              <input
                type="email"
                name="emailId"
                id="emailId"
                value={formData.emailId}
                onChange={handleChange}
                placeholder="Email"
                required
                className={`peer w-full rounded-lg bg-gray-700 text-white placeholder-transparent border ${
                  errors.emailId ? 'border-red-500' : 'border-gray-600'
                } px-10 mt-1 pt-5 pb-2 focus:outline-none focus:ring-2 ${
                  errors.emailId ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'
                } transition-all duration-200`}
              />
              <label
                htmlFor="emailId"
                className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-200 peer-focus:text-sm flex items-center gap-2"
              >
                <Mail size={16} className="text-blue-400" /> Email
              </label>
            </div>
            {errors.emailId && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.emailId[0]}</p>
            )}
          </div>

     
          <div>
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className={`peer w-full rounded-lg bg-gray-700 text-white placeholder-transparent border ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                } px-10 mt-1 pt-5 pb-2 focus:outline-none focus:ring-2 ${
                  errors.password ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-green-500 focus:border-green-500'
                } transition-all duration-200`}
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-200 peer-focus:text-sm flex items-center gap-2"
              >
                <Lock size={16} className="text-green-400" /> Password
              </label>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.password[0]}</p>
            )}
          </div>

        
          <div>
            <div className="relative">
              <label htmlFor="gender" className="text-gray-400 text-sm mb-1">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className={`w-full rounded-lg bg-gray-700 text-white border ${
                  errors.gender ? 'border-red-500' : 'border-gray-600'
                } px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.gender ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
                } focus:border-indigo-500`}
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.gender && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.gender[0]}</p>
            )}
          </div>

      
          <div>
            <div className="relative">
              <label htmlFor="educationYear" className="text-gray-400 text-sm mb-1">Education Year</label>
              <select
                id="educationYear"
                name="educationYear"
                value={formData.educationYear}
                onChange={handleChange}
                required
                className={`w-full rounded-lg bg-gray-700 text-white border ${
                  errors.educationYear ? 'border-red-500' : 'border-gray-600'
                } px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.educationYear ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
                } focus:border-indigo-500`}
              >
                <option value="" disabled>Select Education Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>
            {errors.educationYear && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.educationYear[0]}</p>
            )}
          </div>

       
          {formData.educationYear === 'Graduate' && (
            <div className="animate-fade-in"> 
              <div className="relative">
                <label htmlFor="yearsOfExperience" className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                  <Briefcase size={14} className="text-indigo-400" />
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  id="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 2"
                  className={`w-full rounded-lg bg-gray-700 text-white border ${
                    errors.yearsOfExperience ? 'border-red-500' : 'border-gray-600'
                  } px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.yearsOfExperience ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
                  } focus:border-indigo-500`}
                />
              </div>
              {errors.yearsOfExperience && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.yearsOfExperience[0]}</p>
              )}
            </div>
          )}
          
      
 

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg sm:text-xl shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Already have an account?{' '}
          <Link
    to="/login"
    className="text-purple-400 hover:text-purple-300 font-medium"
  >
    Login
  </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
