import React, { useState } from 'react';
import { X, Filter, ChevronDown } from 'lucide-react';

const FilterModal = ({ filters, onApply, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [openDropdowns, setOpenDropdowns] = useState({});

 const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const primaryGoals = [
    'Build a Startup', 'Portfolio Project', 'Learn a New Skill', 
    'Hackathon', 'Just for Fun', 'Learning', 'Building Projects', 
    'Networking', 'Job Search', 'Project Partner', 'Learning Partner',
    'Mentor', 'Mentee', 'Internship', 'Job', 'Freelance Collaboration'
  ];

  const userRoles = [
    'Designer', 'Student', 'Frontend Developer', 'Backend Developer', 
    'Fullstack Developer', 'Data Scientist', 'Data Analyst', 
    'DevOps Engineer', 'Other'
  ];

    const educationYears = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];
  const activeWindowOptions = [
    { value: '7d', label: 'Active in last 7 days' },
    { value: '3m', label: 'Active in last 3 months' }
  ];
   const skillOptions = ['React', 'JavaScript', 'Python', 'Node.js', 'Java', 'TypeScript', 'Flutter', 'Angular', 'MongoDB', 'PostgreSQL', 'UI/UX', 'Figma'];

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleMultiSelect = (filterType, option) => {
    setLocalFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(option)
        ? prev[filterType].filter(item => item !== option)
        : [...prev[filterType], option]
    }));
  };

  const handleSingleSelect = (filterType, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleApply = () => {
    const hasAnyFilter = 
      localFilters.skills.length > 0 ||
      localFilters.experienceLevel.length > 0 ||
      localFilters.activeWindow ||
      localFilters.locationRadius ||
      localFilters.primaryGoal.length > 0 ||
      localFilters.userRole.length > 0 ||
      localFilters.educationYear.length > 0;

    onApply({
      ...localFilters,
      useAdvancedFilters: hasAnyFilter
    });
  };

  const handleClear = () => {
    setLocalFilters({
      skills: [],
      experienceLevel: [],
      activeWindow: '',
      locationRadius: '',
      primaryGoal: [],
      userRole: [],
      educationYear: [],
      useAdvancedFilters: false
    });
  };

  const DropdownSection = ({ title, options, filterKey, isMultiSelect = false, placeholder = "All" }) => {
    const isOpen = openDropdowns[filterKey];
    const selectedValues = isMultiSelect ? localFilters[filterKey] : [localFilters[filterKey]];
    const displayText = selectedValues.length > 0 && selectedValues[0] 
      ? (isMultiSelect && selectedValues.length > 1 ? `${selectedValues.length} selected` : selectedValues[0])
      : placeholder;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {title}
        </label>
        <div className="relative">
          <button
            onClick={() => toggleDropdown(filterKey)}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md flex items-center justify-between hover:bg-gray-600 transition-colors"
          >
            <span className="text-sm">{displayText}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-gray-700 border border-gray-600 rounded-md mt-1 z-10 max-h-48 overflow-y-auto">
              {!isMultiSelect && (
                <button
                  onClick={() => {
                    handleSingleSelect(filterKey, '');
                    toggleDropdown(filterKey);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-600 transition-colors"
                >
                  {placeholder}
                </button>
              )}
              {options.map((option) => {
                const optionValue = typeof option === 'object' ? option.value : option;
                const optionLabel = typeof option === 'object' ? option.label : option;
                const isSelected = selectedValues.includes(optionValue);
                
                return (
                  <button
                    key={optionValue}
                    onClick={() => {
                      if (isMultiSelect) {
                        handleMultiSelect(filterKey, optionValue);
                      } else {
                        handleSingleSelect(filterKey, optionValue);
                        toggleDropdown(filterKey);
                      }
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      isSelected 
                        ? 'bg-teal-600 text-white' 
                        : 'text-white hover:bg-gray-600'
                    }`}
                  >
                    {optionLabel}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50">
    
      <div className="w-80 bg-gray-800 h-full overflow-y-auto">
     
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white" />
              <h2 className="text-lg font-semibold text-white">Advanced Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-700 rounded-full text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
     
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              type="number"
              value={localFilters.locationRadius}
              onChange={(e) => handleSingleSelect('locationRadius', e.target.value)}
              placeholder="Enter radius in km"
              min="1"
              max="1000"
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

        
          <DropdownSection
            title="Experience Level"
            options={experienceLevels}
            filterKey="experienceLevel"
            isMultiSelect={true}
            placeholder="All Levels"
          />

       
          <DropdownSection
            title="Education Level"
            options={educationYears}
            filterKey="educationYear"
            isMultiSelect={true}
            placeholder="Any Level"
          />

        
          <DropdownSection
            title="Professional Role"
            options={userRoles}
            filterKey="userRole"
            isMultiSelect={true}
            placeholder="Any Role"
          />

          <DropdownSection
            title="Skills"
            options={skillOptions}
            filterKey="skills"
            isMultiSelect={true}
            placeholder="All Skills"
          />

          <DropdownSection
            title="GitHub Activity"
            options={activeWindowOptions}
            filterKey="activeWindow"
            placeholder="Any Activity"
          />

          <DropdownSection
            title="Primary Goal"
            options={primaryGoals}
            filterKey="primaryGoal"
            isMultiSelect={true}
            placeholder="Any Goal"
          />

       
     
        </div>

   
        <div className="p-4 border-t border-gray-700 mt-auto">
          <div className="space-y-2">
            <button
              onClick={handleApply}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Apply Filters
            </button>
            <button
              onClick={handleClear}
              className="w-full bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>
      </div>

    
      <div 
        className="flex-1 bg-black bg-opacity-20"
        onClick={onClose}
      />
    </div>
  );
};

export default FilterModal;