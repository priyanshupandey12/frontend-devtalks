import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../store/constant'
import { logout } from '../store/userSlice'

const Header = () => {
  const user = useSelector((store) => store.user)
  console.log(user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get(`${BASE_URL}/users/logout`, {
        withCredentials: true
      })
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Dev Talks</Link>
      </div>
      <div className="flex-none gap-2">
        {user &&  (
          <>
            <div className="text-lg text-base-content font-bold">
              Welcome, {user.firstName}
            </div>
            <div className="dropdown dropdown-end mr-4">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="user photo"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><Link to="/connections">Connections</Link></li>
                <li><Link to="/request">Requests</Link></li>
                <li><Link to="/premium">Subscription</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </>
        ) }
      </div>
    </div>
  )
}

export default Header