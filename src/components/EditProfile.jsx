import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaVenusMars, FaCamera, FaListUl } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../store/constant';
import axios from 'axios';

import { login } from '../store/userSlice';
const EditProfile = ({ user}) => {
console.log(user)

   const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    gender: user?.gender || '',
    emailId: user?.emailId || '',
    description: user?.description || '',
    photoUrl: user?.photoUrl || '',
    skills: user?.skills || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    const response=await axios.patch(`${BASE_URL}/profile/editprofile`,
    {
      firstName: formData.firstName,
      lastName: formData.lastName,
       gender: formData.gender,
       emailId: formData.emailId,
       description: formData.description,
       photoUrl: formData.photoUrl,
       skills: formData.skills,
    },
      {
        withCredentials: true
      })
      console.log(response.data)
      dispatch(login(response.data.data))


  } catch (error) {
    console.log(error)
  }
  };

  const InputField = ({ icon: Icon, label, name, type = 'text', ...rest }) => (
    <div className="relative group">
      <input
        id={name}
        name={name}
        type={type}
        className="peer h-12 w-full border-b-2 border-gray-300 bg-transparent text-gray-200 placeholder-transparent focus:outline-none focus:border-teal-500 transition duration-300"
        placeholder={label}
        {...rest}
      />
      <label
        htmlFor={name}
        className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-teal-400 peer-focus:text-sm"
      >
        {label}
      </label>
      <Icon className="absolute right-3 top-3 text-gray-400 group-hover:text-teal-400 transition duration-300" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-10 bg-gray-800 p-10 rounded-xl shadow-lg transition-transform transform hover:scale-105">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-teal-400">Edit Profile</h2>
          <p className="mt-2 text-sm text-gray-400">Keep your information updated</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <InputField
              icon={FaUser}
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputField
              icon={FaUser}
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <div className="relative group">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="peer h-12 w-full border-b-2 border-gray-300 bg-transparent text-gray-200 focus:outline-none focus:border-teal-500 transition duration-300"
              >
                <option value="" disabled hidden>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label
                htmlFor="gender"
                className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-teal-400 peer-focus:text-sm"
              >
                Gender
              </label>
              <FaVenusMars className="absolute right-3 top-3 text-gray-400 group-hover:text-teal-400 transition duration-300" />
            </div>
            <InputField
              icon={FaEnvelope}
              label="Email"
              name="emailId"
              type="email"
              value={formData.emailId}
              onChange={handleChange}
            />
            <div className="relative group">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="peer w-full border-b-2 border-gray-300 bg-transparent text-gray-200 placeholder-transparent focus:outline-none focus:border-teal-500 resize-none transition duration-300"
                placeholder="Description"
              ></textarea>
              <label
                htmlFor="description"
                className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-teal-400 peer-focus:text-sm"
              >
                Description
              </label>
            </div>
            <InputField
              icon={FaCamera}
              label="Photo URL"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
            />
            <InputField
              icon={FaListUl}
              label="Skills (comma-separated)"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
