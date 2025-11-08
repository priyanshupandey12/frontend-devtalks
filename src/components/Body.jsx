import React, { useEffect, useState, useRef } from 'react';
import api from '../store/axios';
import { Outlet, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/userSlice';
import Header from './Header';
import Footer from './Footer';

const FullPageSpinner = () => (
  <div 
    className="flex justify-center items-center h-screen bg-gray-900" 
    role="status" 
    aria-label="Loading"
  >
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

const FullPageError = ({ errorMessage, onRetry }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col justify-center items-center text-center h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-red-500 mb-4">
        Oops! Something went wrong.
      </h2>
      <p className="text-lg text-gray-300 mb-8 max-w-md">
        {errorMessage}
      </p>
      <div className="space-x-4">
        <button
          onClick={onRetry || (() => navigate('/'))}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          aria-label="Go to homepage"
        >
          Go to Homepage
        </button>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            aria-label="Retry verification"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user.user);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasVerifiedRef = useRef(false); 


  const getErrorMessage = (err) => {
    if (err.response) {
      if (err.response.status === 401 || err.response.status === 403) {
        return 'Your session has expired or is invalid. Please log in again.';
      } else if (err.response.status >= 500) {
        return 'Our servers are experiencing issues. Please try again in a few minutes.';
      }
    } else if (err.request) {
      return 'Could not connect to the server. Please check your internet connection and try again.';
    }
    return 'An unexpected error occurred. Please try again later.';
  };

  const verifyUserSession = async () => {
    if (hasVerifiedRef.current) return; // Skip if already run
    hasVerifiedRef.current = true;

    try {
      const res = await api.get(`${BASE_URL}/profile/viewprofile`);
      
      if (res.data && res.data.user) {
        dispatch(login({ user: res.data.user }));
      } else {
        // Treat empty user as session invalid (soft 401-like)
        const softError = getErrorMessage({ response: { status: 401 } });
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Session verification returned 2xx but no user data.');
        }
        dispatch(logout());
        setError(softError);
        navigate('/login', { replace: true }); // Auto-redirect to login for smoother UX
      }
    } catch (err) {
      const userErrorMessage = getErrorMessage(err);
      
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Session Verify] Failed:', err.message || err);
      }
      
      dispatch(logout());
      
      if (err.response?.status === 401 || err.response?.status === 403) {
      
        navigate('/login', { replace: true });
      } else {
        setError(userErrorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
      hasVerifiedRef.current = true; 
      return;
    }

    verifyUserSession();
  }, [dispatch, navigate, userData]); 

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    hasVerifiedRef.current = false; 
    verifyUserSession();
  };

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (error) {
    return <FullPageError errorMessage={error} onRetry={handleRetry} />;
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;