import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../store/constant';
import axios from 'axios';
import { login } from '../store/userSlice';

const EditProfile = ({ user, onCancel }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    gender: user?.gender || '',
    description: user?.description || '',
    skills: Array.isArray(user?.skills) ? user.skills.join(", ") : '',
    photoUrl: user?.photoUrl || '',
    location: user?.location?.address || '',
    commitment: user?.commitment || { hoursPerWeek: "", projectDuration: "" },
    primaryGoal: user?.primaryGoal || '',
    userRole: user?.userRole || '',
    links: {
      githubUsername: user?.links?.githubUsername || '',
      linkedin: user?.links?.linkedin || '',
      portfolio: user?.links?.portfolio || ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('links.')) {
      const linkField = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        links: {
          ...prevState.links,
          [linkField]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
 const payload = {
      ...formData,
      skills: formData.skills
        ? formData.skills.split(",").map(skill => skill.trim())
        : [],
      commitment: {
        hoursPerWeek: formData.commitment?.hoursPerWeek || "",
        projectDuration: formData.commitment?.projectDuration || ""
      },
      location: {
        type: "Point",
        coordinates: user?.location?.coordinates || [0, 0],
        address: formData.location
      }
    };

      const response = await axios.patch(
        `${BASE_URL}/profile/editprofile`,
        payload,
        { withCredentials: true }
      );

      dispatch(login(response.data.data));
      setLoading(false);
      if (onCancel) onCancel(); // Go back to view mode after successful save
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating profile');
      setLoading(false);
    }
  };

  return (
 <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <div className="flex items-center gap-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-2xl font-semibold">Edit Profile</h1>
        </div>
        <div className="flex gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-6 mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          {/* Profile Picture Section */}
          <div className="col-span-12 lg:col-span-3">
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-32 h-32 bg-slate-700 rounded-full mb-4 overflow-hidden">
                {formData.photoUrl ? (
                  <img 
                    src={formData.photoUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M17 9H14.5L12 6.5L9.5 9H7V7.5L9.5 5L12 7.5L14.5 5L17 7.5V9M8 12V14H16V12H8Z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="w-full max-w-xs">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="Rohan"
                />
              </div>
              
              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="Mehtas"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Gender <span className="text-red-400">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="Electronic City, Bangalore"
                />
              </div>

              {/* Professional Role */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Professional Role
                </label>
                <select
                  name="userRole"
                  value={formData.userRole}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                 <option value="">Select Role</option>
                 <option value="Developer">Developer</option>
                 <option value="Designer">Designer</option>
                 <option value="Project Owner">Project Owner</option>
                 <option value="Looking to Join">Looking to Join</option>
                 
                </select>
              </div>

              {/* Commitment Level */}
              <div>
  <label className="block text-sm font-medium text-slate-300 mb-2">
    Commitment Level
  </label>
  <div className="grid grid-cols-2 gap-4">
    <input
      type="text"
      name="hoursPerWeek"
      placeholder="Hours per week"
      value={formData.commitment.hoursPerWeek || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          commitment: { ...formData.commitment, hoursPerWeek: e.target.value },
        })
      }
      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
    />
    <input
      type="text"
      name="projectDuration"
      placeholder="Project duration"
      value={formData.commitment.projectDuration || ""}
      onChange={(e) =>
        setFormData({
          ...formData,
          commitment: { ...formData.commitment, projectDuration: e.target.value },
        })
      }
      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
    />
  </div>
</div>

              {/* Skills */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="Node.js, Express, MongoDB, Docker"
                />
              </div>

              {/* Primary Goal */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Primary Goal
                </label>
                <input
                  type="text"
                  name="primaryGoal"
                  value={formData.primaryGoal}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="Hackathon"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Backend engineer exploring distributed systems"
                />
              </div>
            </div>

            {/* Social Links Section */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-white mb-4">Social Links</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    name="links.githubUsername"
                    value={formData.links.githubUsername}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    placeholder="github-username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="links.linkedin"
                    value={formData.links.linkedin}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    name="links.portfolio"
                    value={formData.links.portfolio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;