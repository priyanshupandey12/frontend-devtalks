
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../store/constant';
import api from '../store/axios';
import { login } from '../store/userSlice';
import { ArrowLeft, Save, X, Upload, MapPin, Briefcase, Target, Clock, Code, Github, Linkedin, Globe, User, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ProfileView from './ProfileView';

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

  const previewUser = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    gender: formData.gender,
    photoUrl: photoFile ? URL.createObjectURL(photoFile) : user?.photoUrl,
    userRole: formData.userRole,
    experienceLevel: formData.experienceLevel,
    location: { address: formData.location },
    educationYear: formData.educationYear,
    collegeName: formData.collegeName,
    primaryGoal: formData.primaryGoal,
    skills: formData.skills ? formData.skills.split(",").map(skill => skill.trim()).filter(skill => skill) : [],
    description: formData.description,
    links: formData.links
  };

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

    const skillsArray = formData.skills ? formData.skills.split(",").map(skill => skill.trim()).filter(skill => skill) : [];
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
      toast.success('Profile updated successfully!');
      if (onCancel) onCancel();
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.details) {
        setFormErrors(error.response.data.details);
        const allErrors = Object.values(error.response.data.details)
          .flat()
          .join(', ');
        toast.error(allErrors || "Please check the form fields.");
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-black/50 border-b border-gray-800/50 sticky top-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={onCancel}
                className="p-2 hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-white" />
              </motion.button>
              <motion.h1
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Edit Profile
              </motion.h1>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={onCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700 border border-gray-700/50 hover:border-gray-600 rounded-xl font-medium transition-all duration-200 text-gray-300 hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <X className="w-4 h-4" />
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-gray-300/20 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Fields */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            {/* Photo Upload */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-6"
            >
              <div className="inline-block relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-gray-800/50 shadow-xl mx-auto">
                  {(photoFile || user?.photoUrl) ? (
                    <img
                      src={photoFile ? URL.createObjectURL(photoFile) : user?.photoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <motion.div 
                  className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <Upload className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              <label className="block w-full cursor-pointer mt-4">
                <motion.div
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800/50 hover:bg-gray-700 border border-gray-700/50 hover:border-gray-600 rounded-xl transition-all duration-200 text-gray-300 hover:text-white font-medium mx-auto"
                  whileHover={{ scale: 1.02 }}
                >
                  <Upload className="w-4 h-4" />
                  Change Photo
                </motion.div>
                <input
                  type="file"
                  name="Profile"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-400 mt-2">
                PNG or JPG (max. 5MB)
              </p>
            </motion.div>

            {/* Basic Information */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50 shadow-xl">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold text-white mb-6 flex items-center gap-2"
              >
                <div className="w-1 h-6 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full"></div>
                Basic Information
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 focus:border-gray-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 ${
                      formErrors.firstName ? 'border-red-400 ring-1 ring-red-400/30' : ''
                    }`}
                  />
                  {formErrors.firstName && (
                    <p className="text-sm text-red-400">{formErrors.firstName[0]}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 focus:border-gray-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 ${
                      formErrors.lastName ? 'border-red-400 ring-1 ring-red-400/30' : ''
                    }`}
                  />
                  {formErrors.lastName && (
                    <p className="text-sm text-red-400">{formErrors.lastName[0]}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    Gender <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 focus:border-gray-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 ${
                      formErrors.gender ? 'border-red-400 ring-1 ring-red-400/30' : ''
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.gender && (
                    <p className="text-sm text-red-400">{formErrors.gender[0]}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 focus:border-gray-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Role
                  </label>
                  <select
                    name="userRole"
                    value={formData.userRole}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 focus:border-gray-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200"
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
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 focus:border-gray-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </motion.div>
              </div>
            </div>

            {/* Education & Experience */}
            <motion.div variants={itemVariants} className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50 shadow-xl">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold text-white mb-6 flex items-center gap-2"
              >
                <div className="w-1 h-6 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full"></div>
                Education & Experience
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Education Year
                  </label>
                  <select
                    name="educationYear"
                    value={formData.educationYear}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 focus:border-gray-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200"
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </motion.div>

                {formData.educationYear === 'Graduate' && (
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      min="0"
                      className={`w-full px-4 py-3 bg-gray-800/50 rounded-xl text-white border border-gray-700/50 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 ${
                        formErrors.yearsOfExperience ? 'border-red-400 ring-1 ring-red-400/30' : ''
                      }`}
                    />
                    {formErrors.yearsOfExperience && (
                      <p className="text-sm text-red-400">{formErrors.yearsOfExperience[0]}</p>
                    )}
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    College/University
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 rounded-xl text-white border border-gray-700/50 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 ${
                      formErrors.collegeName ? 'border-red-400 ring-1 ring-red-400/30' : ''
                    }`}
                  />
                  {formErrors.collegeName && (
                    <p className="text-sm text-red-400">{formErrors.collegeName[0]}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    name="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 rounded-xl text-white border border-gray-700/50 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 ${
                      formErrors.fieldOfStudy ? 'border-red-400 ring-1 ring-red-400/30' : ''
                    }`}
                  />
                  {formErrors.fieldOfStudy && (
                    <p className="text-sm text-red-400">{formErrors.fieldOfStudy[0]}</p>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Skills & Goals */}
            <motion.div variants={itemVariants} className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50 shadow-xl">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold text-white mb-6 flex items-center gap-2"
              >
                <div className="w-1 h-6 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full"></div>
                Skills & Goals
              </motion.h3>
              
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Node.js, Express, MongoDB"
                    className={`w-full px-4 py-3 bg-gray-800/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 ${
                      formErrors.skills ? 'border-red-400 ring-1 ring-red-400/30' : 'border-gray-700/50 focus:border-gray-500'
                    }`}
                  />
                  {formErrors.skills && (
                    <p className="text-sm text-red-400">{formErrors.skills[0]}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Separate skills with commas</p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Primary Goal
                  </label>
                  <select
                    name="primaryGoal"
                    value={formData.primaryGoal}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 ${
                      formErrors.primaryGoal ? 'border-red-400 ring-1 ring-red-400/30' : 'border-gray-700/50 focus:border-gray-500'
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
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about yourself..."
                    className={`w-full px-4 py-3 bg-gray-800/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 resize-none transition-all duration-200 ${
                      formErrors.description ? 'border-red-400 ring-1 ring-red-400/30' : 'border-gray-700/50 focus:border-gray-500'
                    }`}
                  />
                  {formErrors.description && (
                    <p className="text-sm text-red-400">{formErrors.description[0]}</p>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50 shadow-xl">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold text-white mb-6 flex items-center gap-2"
              >
                <div className="w-1 h-6 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full"></div>
                Social Links
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    name="links.githubUsername"
                    value={formData.links?.githubUsername}
                    onChange={handleChange}
                    placeholder="username"
                    className={`w-full px-4 py-3 bg-gray-800/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 ${
                      formErrors.links?.githubUsername ? 'border-red-400 ring-1 ring-red-400/30' : 'border-gray-700/50 focus:border-gray-500'
                    }`}
                  />
                  {formErrors.links?.githubUsername && (
                    <p className="text-sm text-red-400">{formErrors.links.githubUsername[0]}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="links.linkedin"
                    value={formData.links?.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className={`w-full px-4 py-3 bg-gray-800/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 ${
                      formErrors.links?.linkedin ? 'border-red-400 ring-1 ring-red-400/30' : 'border-gray-700/50 focus:border-gray-500'
                    }`}
                  />
                  {formErrors.links?.linkedin && (
                    <p className="text-sm text-red-400">{formErrors.links.linkedin[0]}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    name="links.portfolio"
                    value={formData.links?.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                    className={`w-full px-4 py-3 bg-gray-800/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all duration-200 ${
                      formErrors.links?.portfolio ? 'border-red-400 ring-1 ring-red-400/30' : 'border-gray-700/50 focus:border-gray-500'
                    }`}
                  />
                  {formErrors.links?.portfolio && (
                    <p className="text-sm text-red-400">{formErrors.links.portfolio[0]}</p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Live Preview */}
          <motion.div
            variants={itemVariants}
            className="lg:sticky lg:top-24 self-start"
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full"></div>
                Live Preview
              </h3>
              <p className="text-sm text-gray-400">See how your profile looks in real-time</p>
            </motion.div>
            <div className="overflow-hidden rounded-2xl border border-gray-800/50 shadow-xl">
              <ProfileView user={previewUser} isPreview={true} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProfile;