import React, { useEffect, useState } from 'react';
import api from '../store/axios';
import { Outlet, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/userSlice';
import Header from './Header';
import Footer from './Footer';

const FullPageSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-gray-900">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);


const FullPageError = ({ errorMessage }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col justify-center items-center text-center h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold text-red-500 mb-4">
        Oops! Something went wrong.
      </h2>
      <p className="text-lg text-gray-300 mb-8 max-w-md">
        {errorMessage}
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        Go to Homepage
      </button>
    </div>
  );
};



const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user.user);
  
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
      return;
    }

    const verifyUserSession = async () => {
      try {
        const res = await api.get(`${BASE_URL}/profile/viewprofile`);
        
        if (res.data && res.data.user) {
          dispatch(login({ user: res.data.user }));
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Session verification returned 2xx but no user data.');
          }
          dispatch(logout());
          navigate('/'); 
        }
      } catch (err) {
        
     
        let userErrorMessage = 'An unexpected error occurred. Please try again later.';

        if (err.response) {
      
          if (err.response.status === 401 || err.response.status === 403) {
            userErrorMessage = 'Your session has expired or is invalid. Please log in again.';
          }
     
          else if (err.response.status >= 500) {
            userErrorMessage = 'Our servers are experiencing issues. Please try again in a few minutes.';
          }
        } else if (err.request) {
      
          userErrorMessage = 'Could not connect to the server. Please check your internet connection and try again.';
        }
        

        if (process.env.NODE_ENV !== 'production') {
          console.error('[Session Verify] Failed:', err.message || err);
        }
        

        dispatch(logout()); 
        
 
        setError(userErrorMessage);


        
      } finally {
        setIsLoading(false);
      }
    };

    verifyUserSession();
  }, [userData, dispatch, navigate]); 



  if (isLoading) {
    return <FullPageSpinner />;
  }


  if (error) {
    return <FullPageError errorMessage={error} />;
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
}

export default Body;