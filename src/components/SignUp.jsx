import React, { useState } from 'react';
import { User, Mail, Lock,Briefcase , Eye, EyeOff } from 'lucide-react';
import { BASE_URL } from '../store/constant';
import { useNavigate, Link  } from 'react-router-dom';
import api from '../store/axios';
import { toast } from 'react-hot-toast';
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
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

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
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = ["First name is required"];
    if (!formData.lastName.trim()) newErrors.lastName = ["Last name is required"];
    if (!formData.emailId.trim()) newErrors.emailId = ["Email is required"];
    if (!formData.password.trim()) newErrors.password = ["Password is required"];
    if (!formData.gender) newErrors.gender = ["Gender is required"];
    if (!formData.educationYear) newErrors.educationYear = ["Education year is required"];
    if (formData.educationYear === "Graduate" && formData.yearsOfExperience < 0)
      newErrors.yearsOfExperience = ["Years of experience cannot be negative"];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }
    setErrors({});    


    try {
      await api.post(`${BASE_URL}/users/signup`, formData, { withCredentials: true });
        toast.success(" Account created successfully! Redirecting...");
      navigate('/login'); 
       setTimeout(() => navigate('/login'), 1500);
      
    } catch (error) {

       if (error.response) {
        const { data } = error.response;
        if (data.errors) {
          setErrors(data.errors);
          toast.error("Please fix the highlighted errors.");
        } else {
          toast.error(data.message || 'Something went wrong. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }finally {
      setLoading(false); 
    }
  };

return (
<div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">

      <div className="bg-gray-800/70 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg transform transition-all duration-300">
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6 sm:mb-10">
          Join DevTalks
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
         
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
                      errors[field]
                        ? 'focus:ring-red-500 focus:border-red-500'
                        : 'focus:ring-indigo-500 focus:border-indigo-500'
                    } transition-all duration-200`}
                  />
                  <label
                    htmlFor={field}
                    className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-200 peer-focus:text-sm flex items-center gap-3"
                  >
                    <User size={16} className={field === 'firstName' ? 'text-purple-400' : 'text-pink-400'} />
                    {field === 'firstName' ? 'First Name' : 'Last Name'}
                  </label>
                </div>
                {errors[field] && <p className="text-red-400 text-xs mt-1 ml-1">{errors[field][0]}</p>}
              </div>
            ))}
          </div>

          {/* Email */}
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
                errors.emailId ? 'focus:ring-red-500' : 'focus:ring-blue-500'
              } transition-all duration-200`}
            />
            <label
              htmlFor="emailId"
              className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-200 peer-focus:text-sm flex items-center gap-2"
            >
              <Mail size={16} className="text-blue-400" /> Email
            </label>
            {errors.emailId && <p className="text-red-400 text-xs mt-1 ml-1">{errors.emailId[0]}</p>}
          </div>

          {/* Password with Eye Toggle */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className={`peer w-full rounded-lg bg-gray-700 text-white placeholder-transparent border ${
                errors.password ? 'border-red-500' : 'border-gray-600'
              } px-10 mt-1 pt-5 pb-2 focus:outline-none focus:ring-2 ${
                errors.password ? 'focus:ring-red-500' : 'focus:ring-green-500'
              } transition-all duration-200`}
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-200 peer-focus:text-sm flex items-center gap-2"
            >
              <Lock size={16} className="text-green-400" /> Password
            </label>
        <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
>
  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
</button>
            {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password[0]}</p>}
          </div>

          {/* Gender */}
          <div>
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
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className="text-red-400 text-xs mt-1 ml-1">{errors.gender[0]}</p>}
          </div>

          {/* Education Year */}
          <div>
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
            {errors.educationYear && (
              <p className="text-red-400 text-xs mt-1 ml-1">{errors.educationYear[0]}</p>
            )}
          </div>

          {/* Years of Experience */}
          {formData.educationYear === 'Graduate' && (
            <div className="animate-fade-in">
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
              {errors.yearsOfExperience && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.yearsOfExperience[0]}</p>
              )}
            </div>
          )}

        <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-bold text-lg sm:text-xl shadow-md transition-all duration-300 transform 
              ${loading
                ? 'bg-gray-600 cursor-not-allowed opacity-70'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg hover:-translate-y-0.5'
              }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
