import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../store/constant';
import api from '../store/axios';
import { login } from '../store/userSlice';
import { ArrowLeft, Save, X, Upload, MapPin, Briefcase, Target, Clock, Code, Github, Linkedin, Globe, User } from 'lucide-react';
import toast from 'react-hot-toast';

const EditProfile = ({ user, onCancel }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
const [formErrors, setFormErrors] = useState({});
  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    gender: user?.gender || '',
    description: user?.description || '',
    skills: Array.isArray(user?.skills) ? user.skills.join(", ") : '',
    location: user?.location?.address || '',
    primaryGoal: user?.primaryGoal || '',
    userRole: user?.userRole || '',
    experienceLevel: user?.experienceLevel || 'Beginner', 
     educationYear: user?.educationYear || '',
    collegeName: user?.collegeName || '',
    fieldOfStudy: user?.fieldOfStudy || '',
    yearsOfExperience: user?.yearsOfExperience || 0,
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
    } 
    else {
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
   setFormErrors({});

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('gender', formData.gender);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('primaryGoal', formData.primaryGoal);
    data.append('userRole', formData.userRole);
    data.append('experienceLevel', formData.experienceLevel);
    data.append('links', JSON.stringify(formData.links));

    data.append('educationYear', formData.educationYear);
    data.append('collegeName', formData.collegeName);
    data.append('fieldOfStudy', formData.fieldOfStudy);
    data.append('yearsOfExperience', formData.yearsOfExperience.toString()); 

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

      dispatch(login({ user: response.data.user }));
      setLoading(false);
      toast.success('Profile saved successfully!');
      if (onCancel) onCancel(); 
    } catch (error) {
   
if (error.response?.data?.details) {
    setFormErrors(error.response.data.details);


    const allErrors = Object.values(error.response.data.details)
      .flat()
      .join(', ');

    toast.error(allErrors || "Please check the form fields.");
  } 
 
  else if (error.response?.data?.error) {
    toast.error(error.response.data.error);
  } 

  else {
    toast.error("Something went wrong. Please try again.");
  }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </button>
              )}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Edit Profile
              </h1>
            </div>
            <div className="flex gap-3">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 hover:border-slate-500 rounded-lg font-medium transition-all text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

{formErrors.general && (
      <div className="max-w-7xl mx-auto px-6 mt-6">
      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300">
        {formErrors.general}
      </div>
      </div>
    )}
    

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column - Photo Upload */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700/50 shadow-2xl sticky top-24">
              <div className="flex flex-col items-center">
                <div className="relative mb-6 group">
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500/20 shadow-xl">
                    {(photoFile || user?.photoUrl) ? (
                      <img 
                        src={photoFile ? URL.createObjectURL(photoFile) : user?.photoUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
                        <User className="w-16 h-16 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                </div>

                <label className="w-full cursor-pointer">
                  <div className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/50 rounded-xl transition-all text-blue-400 font-medium">
                    <Upload className="w-4 h-4" />
                    Change Photo
                  </div>
                  <input
                    type="file"
                    name="Profile" 
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  PNG or JPG (max. 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Basic Information */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 focus:border-blue-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                   {formErrors.firstName && (
             <p className="text-sm text-red-400">{formErrors.firstName[0]}</p>
  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 focus:border-blue-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                                     {formErrors.lastName && (
             <p className="text-sm text-red-400">{formErrors.lastName[0]}</p>
  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    Gender <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 focus:border-blue-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 focus:border-blue-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Role
                  </label>
              <select
  name="userRole"
  value={formData.userRole}
  onChange={handleChange}
  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 focus:border-blue-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
>
  <option value="">Select Role</option>
  <option value="Student">Student</option>
  <option value="Designer">Designer</option>
  <option value="Frontend Developer">Frontend Developer</option>
  <option value="Backend Developer">Backend Developer</option>
  <option value="Fullstack Developer">Fullstack Developer</option>
  <option value="Data Scientist">Data Scientist</option>
  <option value="Data Analyst">Data Analyst</option>
  <option value="DevOps Engineer">DevOps Engineer</option>
  <option value="Other">Other</option>
</select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 focus:border-blue-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                     <option value="Advanced">Advanced</option>
                  </select>
                </div>

         
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
    <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
    Education & Experience
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Education Year</label>
      <select
        name="educationYear"
        value={formData.educationYear}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 focus:border-blue-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
      >
        <option value="">Select Year</option>
        <option value="1st Year">1st Year</option>
        <option value="2nd Year">2nd Year</option>
        <option value="3rd Year">3rd Year</option>
        <option value="4th Year">4th Year</option>
        <option value="Graduate">Graduate</option>
      </select>
    </div>

{formData.educationYear === 'Graduate' && (
  <div className="space-y-2">

    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Years of Experience</label>
    <input
      type="number"
      name="yearsOfExperience"
      value={formData.yearsOfExperience}
      onChange={handleChange}
      min="0"

      className={`w-full px-4 py-3 bg-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
        formErrors.yearsOfExperience ? 'border-red-500' : 'border-slate-600/50 focus:border-blue-500'
      }`}
    />
    {formErrors.yearsOfExperience && (
      <p className="text-sm text-red-400">{formErrors.yearsOfExperience[0]}</p>
    )}
  </div>
)}
    <div className="space-y-2 md:col-span-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">College/University</label>
        <input
          type="text"
          name="collegeName"
          value={formData.collegeName}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 focus:border-blue-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
         {formErrors.collegeName && <p className="text-sm text-red-400">{formErrors.collegeName[0]}</p>}
    </div>
    <div className="space-y-2 md:col-span-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Field of Study</label>
        <input
          type="text"
          name="fieldOfStudy"
          value={formData.fieldOfStudy}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 focus:border-blue-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
    </div>
  </div>
</div>

            {/* Skills & Goals */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                Skills & Goals
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Node.js, Express, MongoDB"
                 className={`w-full px-4 py-3 bg-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${
          formErrors.skills ? 'border-red-500' : 'border-slate-600/50 focus:border-purple-500'
        }`}
                  />
                    {formErrors.skills && (
        <p className="text-sm text-red-400">{formErrors.skills[0]}</p>
      )}
                  <p className="text-xs text-slate-400 mt-1">Separate skills with commas</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Primary Goal
                  </label>
             <select
  name="primaryGoal"
  value={formData.primaryGoal}
  onChange={handleChange}
   className={`w-full px-4 py-3 bg-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all ${
          formErrors.primaryGoal ? 'border-red-500' : 'border-slate-600/50 focus:border-purple-500'
        }`}
>
  <option value="">Select a Goal</option>
  <option value="Find Teammates for a Project">Find Teammates for a Project</option>
  <option value="Find a Job or Internship">Find a Job or Internship</option>
  <option value="Find a Mentor or Partner to Learn">Find a Mentor or Partner to Learn</option>
  <option value="Network and Explore">Network and Explore</option>

</select>
 {formErrors.primaryGoal && (
        <p className="text-sm text-red-400">{formErrors.primaryGoal[0]}</p>
      )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about yourself..."
                         className={`w-full px-4 py-3 bg-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none transition-all ${
          formErrors.description ? 'border-red-500' : 'border-slate-600/50 focus:border-purple-500'
        }`}
               
                  />
                     {formErrors.description && (
        <p className="text-sm text-red-400">{formErrors.description[0]}</p>
      )}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                Social Links
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    name="links.githubUsername"
                    value={formData.links?.githubUsername}
                    onChange={handleChange}
                    placeholder="username"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 focus:border-green-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                   {formErrors.links?.githubUsername && (
    <p className="text-sm text-red-400">{formErrors.links?.githubUsername[0]}</p>
  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="links.linkedin"
                    value={formData.links?.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 focus:border-green-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                                     {formErrors.links?.linkedin && (
    <p className="text-sm text-red-400">{formErrors.links.linkedin[0]}</p>
  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    name="links.portfolio"
                    value={formData.links?.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 focus:border-green-500 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                   {formErrors.links?.portfolio?.[0] && <p className="text-sm text-red-400">{formErrors.links.portfolio[0]}</p>}
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