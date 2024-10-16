import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../store/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addconnections } from '../store/connectionSlice'

const Connections = () => {
  const dispatch = useDispatch()
  const connectionsData = useSelector((store) => store.connections.connections)
  const [error, setError] = useState(null)

  console.log('Connections data from store:', connectionsData)

  const fetchconnection = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/pending/acceptconnection`, {
        withCredentials: true,
      })
      console.log('API response:', res.data)
      dispatch(addconnections(res.data))
    } catch (error) {
      console.error('Error fetching connections:', error)
      setError(error.message)
      
    }
  }

  useEffect(() => {
    fetchconnection()
  }, [])

  if (error) {
    return (
      <div className='text-center my-10'>
        <h1 className='text-3xl'>Error: {error}</h1>
      </div>
    )
  }

  if (!connectionsData) {
    return (
      <div className='text-center my-10'>
        <h1 className='text-3xl'>Loading connections...</h1>
      </div>
    )
  }

  const connections = connectionsData.data || []

  if (!Array.isArray(connections)) {
    console.error('Connections is not an array:', connections)
    return (
      <div className='text-center my-10'>
        <h1 className='text-3xl'>Error: Invalid connections data</h1>
      </div>
    )
  }

  if (connections.length === 0) {
    return (
      <div className='text-center my-10'>
        <h1 className='text-3xl'>No Connections</h1>
      </div>
    )
  }

  return (
    <div className='text-center my-10'>
      <h1 className='text-3xl'>Connections</h1>
 
      {connections.map((connection) => (
        <div key={connection._id} className='flex align-middle rounded-lg p-4 m-4 '>
         <div>     <img className='w-32 h-32 rounded-full'     src={connection.photoUrl}/></div>
         <div className='flex p-2 '><h2 className='text-xl font-bold'>{connection.firstName} {connection.lastName}</h2>
     
     <p>{connection.skills}</p>
     <p>{connection.description}</p></div>
     
        </div>
      ))}
    </div>
  )
}

export default Connections