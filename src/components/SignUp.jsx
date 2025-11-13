
import React, { useState } from 'react';
import { User, Mail, Lock, Briefcase, Eye, EyeOff, GraduationCap } from 'lucide-react';
import { BASE_URL } from '../store/constant';
import { useNavigate, Link } from 'react-router-dom';
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
    educationYear: '',
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
    setLoading(true);

    try {
      await api.post(`${BASE_URL}/users/signup`, formData, { withCredentials: true });
      toast.success("Account created successfully! Redirecting...");
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-gray-900/50 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg border border-gray-800">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8 sm:mb-12">
          Join DevTalks
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { field: 'firstName', label: 'First Name', icon: User },
              { field: 'lastName', label: 'Last Name', icon: User }
            ].map(({ field, label, icon: Icon }, i) => (
              <div key={i}>
                <label htmlFor={field} className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                  <Icon size={14} className="text-gray-500" />
                  {label}
                </label>
                <input
                  type="text"
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={label}
                  required
                  className={`w-full h-12 rounded-xl bg-gray-800 text-white border px-4 focus:outline-none focus:ring-1 focus:ring-gray-600/50 focus:border-gray-600 transition-all duration-300 ${
                    errors[field] ? 'border-red-400 ring-1 ring-red-400/30 placeholder-red-400' : 'border-gray-700 placeholder-gray-500'
                  }`}
                />
                {errors[field] && <p className="text-red-400 text-xs mt-1 ml-1">{errors[field][0]}</p>}
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="emailId" className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
              <Mail size={14} className="text-gray-500" />
              Email
            </label>
            <input
              type="email"
              name="emailId"
              id="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="Email"
              required
              className={`w-full h-12 rounded-xl bg-gray-800 text-white border px-4 focus:outline-none focus:ring-1 focus:ring-gray-600/50 focus:border-gray-600 transition-all duration-300 ${
                errors.emailId ? 'border-red-400 ring-1 ring-red-400/30 placeholder-red-400' : 'border-gray-700 placeholder-gray-500'
              }`}
            />
            {errors.emailId && <p className="text-red-400 text-xs mt-1 ml-1">{errors.emailId[0]}</p>}
          </div>

          <div>
            <label htmlFor="password" className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
              <Lock size={14} className="text-gray-500" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className={`w-full h-12 rounded-xl bg-gray-800 text-white border px-4 pr-12 focus:outline-none focus:ring-1 focus:ring-gray-600/50 focus:border-gray-600 transition-all duration-300 ${
                  errors.password ? 'border-red-400 ring-1 ring-red-400/30 placeholder-red-400' : 'border-gray-700 placeholder-gray-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password[0]}</p>}
          </div>

          <div>
            <label htmlFor="gender" className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
              <User size={14} className="text-gray-500" />
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={`w-full h-12 rounded-xl bg-gray-800 text-white border px-4 focus:outline-none focus:ring-1 focus:ring-gray-600/50 focus:border-gray-600 transition-all duration-300 appearance-none ${
                errors.gender ? 'border-red-400 ring-1 ring-red-400/30' : 'border-gray-700'
              }`}
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-400 text-xs mt-1 ml-1">{errors.gender[0]}</p>}
          </div>

          <div>
            <label htmlFor="educationYear" className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
              <GraduationCap size={14} className="text-gray-500" />
              Education Year
            </label>
            <select
              id="educationYear"
              name="educationYear"
              value={formData.educationYear}
              onChange={handleChange}
              required
              className={`w-full h-12 rounded-xl bg-gray-800 text-white border px-4 focus:outline-none focus:ring-1 focus:ring-gray-600/50 focus:border-gray-600 transition-all duration-300 appearance-none ${
                errors.educationYear ? 'border-red-400 ring-1 ring-red-400/30' : 'border-gray-700'
              }`}
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
            <div>
              <label htmlFor="yearsOfExperience" className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                <Briefcase size={14} className="text-gray-500" />
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
                className={`w-full h-12 rounded-xl bg-gray-800 text-white border px-4 focus:outline-none focus:ring-1 focus:ring-gray-600/50 focus:border-gray-600 transition-all duration-300 ${
                  errors.yearsOfExperience ? 'border-red-400 ring-1 ring-red-400/30 placeholder-red-400' : 'border-gray-700 placeholder-gray-500'
                }`}
              />
              {errors.yearsOfExperience && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.yearsOfExperience[0]}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-xl font-medium text-lg border transition-all duration-300 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed opacity-70 border-gray-600 text-gray-400'
                : 'bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-300/20 text-black'
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:text-gray-300 font-medium transition-colors duration-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;