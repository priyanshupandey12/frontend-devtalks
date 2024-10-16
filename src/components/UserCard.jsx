import { Heart, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removefeed } from '../store/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../store/constant';
const UserCard = ({ user }) => {
  console.log('UserCard received user:', user);
  const dispatch = useDispatch()

  const handlerequest=async(status,_id)=>{
    try {
      const res=await axios.post(`${BASE_URL}/connection/request/send/${status}/${_id}`,
      {},
      {
        withCredentials:true
      }) 
      console.log('Response from handlerequest:', res);
      dispatch(removefeed(_id))
    } catch (error) {
      console.log(error)
    } 
  }
  if (!user) {
    console.log('No user data provided to UserCard');
    return <div>No user data available</div>;
  }

  return (
    <div className="relative w-64 h-80 bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={user.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqiwrtc2R9MuIS83171xsgtTt81GddweP-g&s"}
        alt={`${user.firstName || 'Unknown'} ${user.lastName || 'User'}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h2 className="text-white text-xl font-bold">
          {user.firstName || 'Unknown'} {user.lastName || 'User'}
        </h2>
        {user.skills && user.skills.length > 0 && (
          <p className="text-white text-sm mt-1">{user.skills.join(', ')}</p>
        )}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <button className="bg-white rounded-full p-3 shadow-lg" onClick={() => handlerequest('ignored',user._id)}>
          <X className="text-red-500 w-8 h-8" />
        </button>
        <button className="bg-white rounded-full p-3 shadow-lg" onClick={() => handlerequest('Interested',user._id)}>
          <Heart className="text-green-500 w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default UserCard;