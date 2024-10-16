import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user=useSelector((store)=>store.user)
  console.log(user)

  return (
    user  && (
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
      <EditProfile user={user}/>
    </div>
     )
 
  )
}

export default Profile