import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const FilterModal = ({ filters, onApply, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [skillInput, setSkillInput] = useState('');

 
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const primaryGoals = ['Learning', 'Building Projects', 'Hackathon', 'Networking', 'Job Search'];
  const hoursPerWeekOptions = ['1-5 hours', '5-10 hours', '10-15 hours', '15-20 hours', '20+ hours'];
  const activeWindowOptions = [
    { value: '7d', label: 'Active in last 7 days' },
    { value: '3m', label: 'Active in last 3 months' }
  ];

  const handleAddSkill = () => {
    if (skillInput.trim() && !localFilters.skills.includes(skillInput.trim())) {
      setLocalFilters(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setLocalFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleToggleOption = (filterType, option) => {
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
      localFilters.hoursPerWeek;

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
      hoursPerWeek: '',
      useAdvancedFilters: false
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Filter Users</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Skills Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Skills
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                placeholder="Add a skill..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddSkill}
                disabled={!skillInput.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {localFilters.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {localFilters.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:bg-blue-200 rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Experience Level
            </label>
            <div className="grid grid-cols-2 gap-2">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleToggleOption('experienceLevel', level)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    localFilters.experienceLevel.includes(level)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Primary Goal
            </label>
            <div className="space-y-2">
              {primaryGoals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleToggleOption('primaryGoal', goal)}
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors ${
                    localFilters.primaryGoal.includes(goal)
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* GitHub Activity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              GitHub Activity
            </label>
            <div className="space-y-2">
              <button
                onClick={() => handleSingleSelect('activeWindow', '')}
                className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors ${
                  !localFilters.activeWindow
                    ? 'bg-gray-600 text-white border-gray-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Any Activity
              </button>
              {activeWindowOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSingleSelect('activeWindow', option.value)}
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors ${
                    localFilters.activeWindow === option.value
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hours per Week */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Hours per Week
            </label>
            <div className="space-y-2">
              <button
                onClick={() => handleSingleSelect('hoursPerWeek', '')}
                className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors ${
                  !localFilters.hoursPerWeek
                    ? 'bg-gray-600 text-white border-gray-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Any Hours
              </button>
              {hoursPerWeekOptions.map((hours) => (
                <button
                  key={hours}
                  onClick={() => handleSingleSelect('hoursPerWeek', hours)}
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors ${
                    localFilters.hoursPerWeek === hours
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {hours}
                </button>
              ))}
            </div>
          </div>

     
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Location Radius (km)
            </label>
            <input
              type="number"
              value={localFilters.locationRadius}
              onChange={(e) => handleSingleSelect('locationRadius', e.target.value)}
              placeholder="Enter radius in km"
              min="1"
              max="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 rounded-b-2xl">
          <div className="flex gap-3">
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Clear All
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;