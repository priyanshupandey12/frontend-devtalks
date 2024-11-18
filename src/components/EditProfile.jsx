import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../store/constant';
import axios from 'axios';
import { login } from '../store/userSlice';

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    gender: user?.gender || '',
    emailId: user?.emailId || '',
    description: user?.description || '',
    skills: user?.skills || '', // Simplified: no need to join with commas
    photoUrl: user?.photoUrl || '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.patch(
        `${BASE_URL}/profile/editprofile`,
        formData,
        { withCredentials: true }
      );

      dispatch(login(response.data.data));
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating profile');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-10 bg-gray-800 p-10 rounded-xl shadow-lg transition-transform transform hover:scale-105">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-teal-400">Edit Profile</h2>
          <p className="mt-2 text-sm text-gray-400">Keep your information updated</p>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="relative">
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="block w-full px-4 py-3 text-gray-200 bg-transparent border-b-2 border-gray-300 focus:border-teal-500 focus:outline-none transition-colors duration-300"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="firstName"
                className="absolute left-0 -top-5 text-sm text-gray-400"
              >
                First Name
              </label>
            </div>
            <div className="relative">
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="block w-full px-4 py-3 text-gray-200 bg-transparent border-b-2 border-gray-300 focus:border-teal-500 focus:outline-none transition-colors duration-300"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="lastName"
                className="absolute left-0 -top-5 text-sm text-gray-400"
              >
                Last Name
              </label>
            </div>
            <div className="relative">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-200 bg-transparent border-b-2 border-gray-300 focus:border-teal-500 focus:outline-none transition-colors duration-300"
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label
                htmlFor="gender"
                className="absolute left-0 -top-5 text-sm text-gray-400"
              >
                Gender
              </label>
            </div>
            <div className="relative">
              <input
                id="emailId"
                name="emailId"
                type="email"
                className="block w-full px-4 py-3 text-gray-200 bg-transparent border-b-2 border-gray-300 focus:border-teal-500 focus:outline-none transition-colors duration-300"
                value={formData.emailId}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="emailId"
                className="absolute left-0 -top-5 text-sm text-gray-400"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="block w-full px-4 py-3 text-gray-200 bg-transparent border-b-2 border-gray-300 focus:border-teal-500 focus:outline-none transition-colors duration-300 resize-none"
              />
              <label
                htmlFor="description"
                className="absolute left-0 -top-5 text-sm text-gray-400"
              >
                Description
              </label>
            </div>
            <div className="relative">
              <input
                id="photoUrl"
                name="photoUrl"
                type="text"
                className="block w-full px-4 py-3 text-gray-200 bg-transparent border-b-2 border-gray-300 focus:border-teal-500 focus:outline-none transition-colors duration-300"
                value={formData.photoUrl}
                onChange={handleChange}
              />
              <label
                htmlFor="photoUrl"
                className="absolute left-0 -top-5 text-sm text-gray-400"
              >
                Photo URL
              </label>
            </div>
            <div className="relative">
              <input
                id="skills"
                name="skills"
                type="text"
                className="block w-full px-4 py-3 text-gray-200 bg-transparent border-b-2 border-gray-300 focus:border-teal-500 focus:outline-none transition-colors duration-300"
                value={formData.skills}
                onChange={handleChange}
              />
              <label
                htmlFor="skills"
                className="absolute left-0 -top-5 text-sm text-gray-400"
              >
                Skills (comma-separated)
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
