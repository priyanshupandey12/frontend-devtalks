
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../store/constant';
import api from '../store/axios';
import { login } from '../store/userSlice';

const EditProfile = ({ user, onCancel }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    gender: user?.gender || '',
    description: user?.description || '',
    skills: Array.isArray(user?.skills) ? user.skills.join(", ") : '',
    location: user?.location?.address || '',
    commitment: user?.commitment || { hoursPerWeek: "", projectDuration: "" },
    primaryGoal: user?.primaryGoal || '',
    userRole: user?.userRole || '',
    experienceLevel: user?.experienceLevel || 'Beginner', 
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
    } else if (name === 'hoursPerWeek' || name === 'projectDuration') {
      setFormData(prevState => ({
          ...prevState,
          commitment: {
              ...prevState.commitment,
              [name]: value
          }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();

    
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('gender', formData.gender);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('primaryGoal', formData.primaryGoal);
    data.append('userRole', formData.userRole);
    data.append('experienceLevel', formData.experienceLevel);


    data.append('commitment', JSON.stringify(formData.commitment));
    data.append('links', JSON.stringify(formData.links));

 
    const skillsArray = formData.skills ? formData.skills.split(",").map(skill => skill.trim()) : [];
    skillsArray.forEach(skill => {
        data.append('skills[]', skill);
    });

  
    if (photoFile) {
        data.append('Profile', photoFile);
    }

    try {
      const response = await api.patch(
        `${BASE_URL}/profile/editprofile`,
        data, 
        { withCredentials: true }
      );

      dispatch(login({ user: response.data.user, token: response.data.accessToken }));
      setLoading(false);
      if (onCancel) onCancel(); 
    } catch (error) {
      console.log(error.response?.data);
      setError(error.response?.data?.message || 'An error occurred while updating profile');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
    
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


      {error && (
        <div className="mx-6 mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300">
          {error}
        </div>
      )}


      <div className="p-6">
        <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
          

          <div className="col-span-12 lg:col-span-3">
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-32 h-32 bg-slate-700 rounded-full mb-4 overflow-hidden">
                <img 
               
                    src={photoFile ? URL.createObjectURL(photoFile) : user?.photoUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full max-w-xs">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Change Photo
                </label>
                <input
                  type="file"
                  name="Profile" 
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange} 
                  className="w-full text-sm text-slate-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-slate-600 file:text-green-300
                    hover:file:bg-slate-700"
                />
              </div>
            </div>
          </div>

    
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
          
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500" />
              </div>
              
          
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500" />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Gender <span className="text-red-400">*</span>
                </label>
                <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500" />
              </div>

              {/* Professional Role */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Professional Role</label>
                <select name="userRole" value={formData.userRole} onChange={handleChange} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                  <option value="">Select Role</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Project Owner">Project Owner</option>
                  <option value="Looking to Join">Looking to Join</option>
                </select>
              </div>

              {/* Experience Level - NEWLY ADDED */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Experience Level</label>
                <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                  <option value="Student">Student</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>

              {/* Commitment Level */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-slate-300 mb-2">Commitment Level</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="hoursPerWeek" placeholder="Hours per week" value={formData.commitment.hoursPerWeek} onChange={handleChange} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500" />
                  <input type="text" name="projectDuration" placeholder="Project duration" value={formData.commitment.projectDuration} onChange={handleChange} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              {/* Skills */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-slate-300 mb-2">Skills</label>
                <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Node.js, Express, MongoDB" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500" />
              </div>

              {/* Primary Goal */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-slate-300 mb-2">Primary Goal</label>
                <select name="primaryGoal" value={formData.primaryGoal} onChange={handleChange} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                    <option value="">Select a Goal</option>
                    <option value="Build a Startup">Build a Startup</option>
                    <option value="Portfolio Project">Portfolio Project</option>
                    <option value="Learn a New Skill">Learn a New Skill</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Just for Fun">Just for Fun</option>
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none" />
              </div>
            </div>

            {/* Social Links Section */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-white mb-4">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">GitHub Username</label>
                  <input type="text" name="links.githubUsername" value={formData.links.githubUsername} onChange={handleChange} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn Profile</label>
                  <input type="url" name="links.linkedin" value={formData.links.linkedin} onChange={handleChange} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Portfolio Website</label>
                  <input type="url" name="links.portfolio" value={formData.links.portfolio} onChange={handleChange} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500" />
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
