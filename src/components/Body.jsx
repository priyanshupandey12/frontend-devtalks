import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../store/constant'
import { useDispatch } from 'react-redux'
import { login } from '../store/userSlice'
import Header from './Header'
import { useSelector } from 'react-redux'
const Body = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const userData=useSelector((store)=>store.user)
  const fetchUser=async()=>{
    if(userData) return;
    try {
      const res=await axios.get(`${BASE_URL}/profile/viewprofile`,{
        withCredentials:true
      })  
      dispatch(login(res.data))

    } catch (error) {
        console.log(error)
        navigate('/')
    
    
      }

  }

   useEffect(() => {
    fetchUser()
  }, [])

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