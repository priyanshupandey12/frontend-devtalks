import { MapPin, Briefcase, Target, Clock, Code, Github, Linkedin, Globe, User, GraduationCap, Building, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, x: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    x: 0, 
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 25,
      mass: 0.8 
    } 
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60, 
    scale: 0.9, 
    rotateX: -15,
    rotateY: -5 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    transition: { 
      type: "spring", 
      stiffness: 250, 
      damping: 20, 
      duration: 1.2,
      delay: 0.2 
    },
  },
  whileHover: { 
    y: -15, 
    rotateX: 5,
    rotateY: 3,
    scale: 1.02,
    transition: { 
      type: "spring", 
      stiffness: 350, 
      damping: 15 
    } 
  },
};

const staggerChild = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 30 
    } 
  },
};

const ProfileView = ({ user }) => {
  const hasPhoto = !!user?.photoUrl;
  const headerStyle = hasPhoto ? { backgroundImage: `url(${user.photoUrl})` } : {};
  const headerClasses = hasPhoto 
    ? 'bg-cover bg-center bg-no-repeat relative' 
    : 'bg-gradient-to-r from-gray-100/90 via-gray-200/80 to-gray-300/50';

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Subtle background elements for resemblance */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-l from-indigo-900/20 to-pink-900/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-lg mx-auto px-4 py-8 relative z-10">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="whileHover"
          className="bg-white backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-2xl shadow-black/30 overflow-hidden relative"
          style={{ perspective: '1200px' }}
        >
          {/* Card Header */}
          <motion.div
            variants={itemVariants}
            className={`${headerClasses} p-6 text-center border-b border-gray-200/50 relative overflow-hidden`}
            style={headerStyle}
          >
            {hasPhoto && (
              <>
                {/* Blurred background overlay for enhancement */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
              </>
            )}
            {!hasPhoto && (
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-transparent transform -skew-y-3 translate-y-4" />
            )}
            <div className="relative inline-block mb-4">
              <motion.div
                variants={staggerChild}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-gray-200/50 shadow-xl relative group mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  {user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={`${user.firstName || 'Unknown'} ${user.lastName || 'User'}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200/80 to-gray-300/80 flex items-center justify-center relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent rounded-full opacity-30"
                      />
                      <User className="w-12 h-12 text-gray-600 relative z-10" />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <motion.h2
              variants={itemVariants}
              transition={{ delay: 0.7 }}
              className="text-2xl font-bold text-gray-900 mb-2 relative z-10"
              style={{ textShadow: '0 0 20px rgba(0,0,0,0.1)' }}
            >
              {user?.firstName} {user?.lastName}
            </motion.h2>
            <motion.div
              variants={staggerChild}
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ delay: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100/70 rounded-full border border-gray-300/50 backdrop-blur-sm relative z-10"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4"
              >
                <Briefcase className="w-4 h-4 text-gray-600" />
              </motion.div>
              <span className="text-gray-700 font-semibold text-sm">
                {user?.userRole || 'Developer'}
              </span>
            </motion.div>
          </motion.div>

          {/* Card Body */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 space-y-6"
          >
            {/* Basic Info */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="space-y-2 group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    className="w-3 h-3"
                  >
                    <User className="w-3 h-3" />
                  </motion.div>
                  Gender
                </label>
                <motion.p 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-900 text-base font-medium capitalize"
                >
                  {user?.gender || 'Not specified'}
                </motion.p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2 group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    className="w-3 h-3"
                  >
                    <Target className="w-3 h-3" />
                  </motion.div>
                  Experience Level
                </label>
                <motion.p 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-900 text-base font-medium capitalize"
                >
                  {user?.experienceLevel || 'Not specified'}
                </motion.p>
              </motion.div>

              {user?.location?.address && (
                <motion.div variants={itemVariants} className="space-y-2 group md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      className="w-3 h-3"
                    >
                      <MapPin className="w-3 h-3" />
                    </motion.div>
                    Location
                  </label>
                  <motion.p 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-900 text-base font-medium"
                  >
                    {user.location.address}
                  </motion.p>
                </motion.div>
              )}

              {user?.educationYear && (
                <motion.div variants={itemVariants} className="space-y-2 group md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      className="w-3 h-3"
                    >
                      <GraduationCap className="w-3 h-3" />
                    </motion.div>
                    Education
                  </label>
                  <motion.p 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-900 text-base font-medium"
                  >
                    {user.educationYear}
                    {user.collegeName ? ` • ${user.collegeName}` : ''}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>

            {/* Goals & Skills */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div variants={itemVariants} className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4"
                  >
                    <Target className="w-4 h-4" />
                  </motion.div>
                  Primary Goal
                </label>
                <motion.p
                  initial={{ opacity: 0, x: -30, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-gray-700 text-base leading-relaxed bg-gray-50/40 p-4 rounded-xl border border-gray-200/50 backdrop-blur-sm"
                >
                  {user?.primaryGoal || 'No goal specified yet.'}
                </motion.p>
              </motion.div>

              <motion.div variants={itemVariants} className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4"
                  >
                    <Code className="w-4 h-4" />
                  </motion.div>
                  Skills
                </label>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  variants={containerVariants}
                  className="flex flex-wrap gap-2"
                >
                  {Array.isArray(user?.skills) && user.skills.length > 0 ? (
                    user.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        variants={staggerChild}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.1, 
                          y: -5, 
                          rotate: 5,
                          backgroundColor: "rgba(248, 250, 252, 0.8)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-gray-100/50 text-gray-700 text-xs rounded-full border border-gray-200/50 font-medium cursor-pointer shadow-sm"
                      >
                        {skill}
                      </motion.span>
                    ))
                  ) : (
                    <motion.span 
                      variants={staggerChild}
                      className="text-gray-500 italic text-sm"
                    >
                      No skills listed
                    </motion.span>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Description */}
            {user?.description && (
              <motion.div variants={itemVariants} className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                  About Me
                </label>
                <motion.p
                  initial={{ opacity: 0, x: 30, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  whileHover={{ x: -10, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-gray-700 text-sm leading-relaxed bg-gray-50/40 p-4 rounded-xl border border-gray-200/50 backdrop-blur-sm"
                >
                  {user.description}
                </motion.p>
              </motion.div>
            )}

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 block">
                Social Links
              </label>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                variants={containerVariants}
                className="flex flex-wrap gap-3"
              >
                {user?.links?.githubUsername && (
                  <motion.a
                    href={`https://github.com/${user.links.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={staggerChild}
                    whileHover={{ 
                      y: -5, 
                      scale: 1.05, 
                      rotateY: 10,
                      backgroundColor: "rgba(156, 163, 175, 0.9)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring" }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-100/50 hover:bg-gray-200/70 rounded-lg border border-gray-200/50 text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-sm"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-4 h-4"
                    >
                      <Github className="w-4 h-4" />
                    </motion.div>
                    <span className="text-xs font-medium">GitHub</span>
                  </motion.a>
                )}

                {user?.links?.linkedin && (
                  <motion.a
                    href={user.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={staggerChild}
                    whileHover={{ 
                      y: -5, 
                      scale: 1.05, 
                      rotateY: 10,
                      backgroundColor: "rgba(156, 163, 175, 0.9)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring" }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-100/50 hover:bg-gray-200/70 rounded-lg border border-gray-200/50 text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-sm"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-4 h-4"
                    >
                      <Linkedin className="w-4 h-4" />
                    </motion.div>
                    <span className="text-xs font-medium">LinkedIn</span>
                  </motion.a>
                )}

                {user?.links?.portfolio && (
                  <motion.a
                    href={user.links.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={staggerChild}
                    whileHover={{ 
                      y: -5, 
                      scale: 1.05, 
                      rotateY: 10,
                      backgroundColor: "rgba(156, 163, 175, 0.9)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring" }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-100/50 hover:bg-gray-200/70 rounded-lg border border-gray-200/50 text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-sm"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-4 h-4"
                    >
                      <Globe className="w-4 h-4" />
                    </motion.div>
                    <span className="text-xs font-medium">Portfolio</span>
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileView;