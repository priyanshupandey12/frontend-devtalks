



import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../store/axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../store/constant';
import GoogleAuthButton from "./GoogleAuthButton";
import { toast } from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailId: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.emailId.trim()) newErrors.emailId = ["Email is required"];
    if (!formData.password.trim()) newErrors.password = ["Password is required"];
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (field) => {
    if (!errors[field]) return null;
    const err = errors[field];
    return Array.isArray(err) ? err[0] : err;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      const response = await api.post(
        `${BASE_URL}/users/login`,
        { emailId: formData.emailId, password: formData.password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      toast.success(`Welcome back, ${response.data.user.firstName || 'User'}!`);
      dispatch(login({ user: response.data.user }));
      navigate('/feed');

    } catch (err) {
      if (err.response) {
        const { data } = err.response;
        if (data.errors) {
          // Process field-specific errors
          const processedErrors = {};
          Object.keys(data.errors).forEach(field => {
            const errValue = data.errors[field];
            processedErrors[field] = Array.isArray(errValue) ? errValue : [errValue];
          });
          setErrors(processedErrors);
          toast.error("Please fix the highlighted errors.");
        } else {
          const message = data.message || 'Unable to log in right now.';
          toast.error(message);
          // Set general error under both fields if not field-specific
          setErrors({
            emailId: [message],
            password: [message]
          });
        }
      } else if (err.request) {
        const message = 'Network error. Please check your internet connection.';
        toast.error(message);
        setErrors({
          emailId: [message],
          password: [message]
        });
      } else {
        const message = 'Something went wrong. Please try again later.';
        toast.error(message);
        setErrors({
          emailId: [message],
          password: [message]
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
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
              <span className="px-2 bg-black text-gray-400">OR</span>
            </div>
          </div>

          <form onSubmit={handleLogin} noValidate className="space-y-6">
            <div>
              <label htmlFor="emailId" className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                <Mail size={14} className="text-gray-500" />
                Email Address
              </label>
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Enter your email"
                required
                className={`w-full h-12 rounded-xl bg-gray-800 text-white border px-4 focus:outline-none focus:ring-1 focus:ring-gray-600/50 focus:border-gray-600 transition-all duration-300 ${
                  errors.emailId ? 'border-red-400 ring-1 ring-red-400/30 placeholder-red-400' : 'border-gray-700 placeholder-gray-500'
                }`}
              />
              {getErrorMessage('emailId') && <p className="text-red-400 text-xs mt-1 ml-1">{getErrorMessage('emailId')}</p>}
            </div>

            <div>
              <label htmlFor="password" className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                <Lock size={14} className="text-gray-500" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="Enter your password"
                  required
                  className={`w-full h-12 rounded-xl bg-gray-800 text-white border px-4 pr-12 focus:outline-none focus:ring-1 focus:ring-gray-600/50 focus:border-gray-600 transition-all duration-300 ${
                    errors.password ? 'border-red-400 ring-1 ring-red-400/30 placeholder-red-400' : 'border-gray-700 placeholder-gray-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {getErrorMessage('password') && <p className="text-red-400 text-xs mt-1 ml-1">{getErrorMessage('password')}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 rounded-xl font-medium text-lg border transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed opacity-70 border-gray-600 text-gray-400'
                  : 'bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-300/20 text-black'
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Don’t have an account?{' '}
              <Link to="/signup" className="font-medium text-white hover:text-gray-300 transition-colors duration-200">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 lg:border-l lg:border-gray-800 hidden lg:block">
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
