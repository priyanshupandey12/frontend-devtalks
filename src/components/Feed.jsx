import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addfeed } from '../store/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed.feed);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const getfeed = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await axios.get(`${BASE_URL}/pending/choosingcard`, {
        withCredentials: true
      });
      console.log(res.data)
      dispatch(addfeed(res?.data));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch user data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!feed) {
      getfeed();
    } else {
      setIsLoading(false);
    }
  }, [feed]);



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const users = feed && feed.data && Array.isArray(feed.data) ? feed.data : [];
  console.log('Feed data from store:', users);
  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 min-h-screen">
      {users.length > 0 ? (
        <UserCard user={users[0]} />
      ) : (
        <div>
          No users available
 
        </div>
      )}
    </div>
  );
};

export default Feed;