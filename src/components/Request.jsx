import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addrequest, removerequest } from '../store/requestSlice';
import api from '../store/axios';

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request.request);
  console.log(requests)
  

  const reviewRequest = async (status, _id) => {
    try {
    
      const res = await api.post(
        `${BASE_URL}/connection/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

    
      dispatch(removerequest(_id));

   
      fetchrequest();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchrequest = async () => {
    try {
      const res = await api.get(`${BASE_URL}/pending/viewrequest`, {
        withCredentials: true,
      });
      dispatch(addrequest(res.data)); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchrequest();
  }, []);

  if (!requests || !requests.data || requests.data.length === 0) {
    return (
      <div className="text-center my-10">
        <h1 className="text-3xl">No Requests</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Requests</h1>
      <div className="bg-gray-800 shadow-md rounded-lg p-6">
    
        {requests.data.map((request) => (
          <div key={request._id} className="mb-4">
            <div className="flex items-center justify-between mb-4 mx-2">
              <img
                src={request.fromuserId?.photoUrl}
                alt={request.fromuserId.firstName}
                className="w-14 h-14 rounded-full"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold ml-3">
                  {request.fromuserId.firstName} {request.fromuserId.lastName}
                </h2>
              </div>
              <div>
                <button
                  className="btn btn-success"
                  onClick={() => reviewRequest('accepted', request._id)}
                >
                  Accepted
                </button>
                <button
                  className="btn btn-error ml-2"
                  onClick={() => reviewRequest('rejected', request._id)}
                >
                  Rejected
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
