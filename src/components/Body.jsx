import React, { useEffect,useState } from 'react'
import api from '../store/axios';
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../store/constant'
import { useDispatch } from 'react-redux'
import { login,logout } from '../store/userSlice'
import Header from './Header'
import { useSelector } from 'react-redux'
const Body = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const userData=useSelector((store)=>store.user.user)
    const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
    
    if (userData) {
      setIsLoading(false);
      return;
    }

    const verifyUserSession = async () => {
      try {
        const res = await api.get(`${BASE_URL}/profile/viewprofile`);
        
      
        if (res.data && res.data.user) {
          dispatch(login({ user: res.data.user, token: res.data.accessToken }));
        } else {
        
          dispatch(logout());
          navigate('/');
        }
      } catch (error) {
        console.error("Session verification failed:", error);
     
        dispatch(logout()); 
        navigate('/');
      } finally {
      
        setIsLoading(false);
      }
    };

    verifyUserSession();
  }, []); 


  if (isLoading) {
 <div className="flex justify-center items-center h-64">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <main className="pt-16 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body