import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import FloatingChat from './FloatingChat';

interface UserInfoData {
  experienceYears: number;
  currentTechStack: string;
  expectedRole: string;
}

const UserInfoForm: React.FC = () => {
  const [experienceYears, setExperienceYears] = useState<number>(0);
  const [currentTechStack, setCurrentTechStack] = useState('');
  const [expectedRole, setExpectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, completeUserInfo } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const userInfoData: UserInfoData = {
      experienceYears,
      currentTechStack,
      expectedRole,
    };

    try {
      // TODO: Replace with live API call when available
      // const response = await fetch('/api/user-info', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify({
      //     userId: localStorage.getItem('userId'),
      //     ...userInfoData
      //   })
      // });
      // const data = await response.json();
      // if (response.ok) {
      //   completeUserInfo(userInfoData);
      // } else {
      //   console.error('Failed to submit user info:', data.error);
      // }
      
      // Using mock data for now - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      completeUserInfo(userInfoData);
    } catch (error) {
      console.error('Error submitting user info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-2xl border border-gray-700">
        {/* Three green dots header */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
            <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
            <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Welcome, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Help us personalize your learning experience
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-3">
              Years of Experience
            </label>
            <select
              id="experience"
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-colors"
              required
            >
              <option value={0}>Select your experience level</option>
              <option value={1}>Less than 1 year</option>
              <option value={2}>1-2 years</option>
              <option value={3}>3-5 years</option>
              <option value={5}>5-8 years</option>
              <option value={8}>8+ years</option>
            </select>
          </div>

          <div>
            <label htmlFor="currentTech" className="block text-sm font-medium text-gray-300 mb-3">
              Current Tech Stack
            </label>
            <textarea
              id="currentTech"
              value={currentTechStack}
              onChange={(e) => setCurrentTechStack(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-colors resize-none h-32"
              placeholder="List the technologies you're currently working with (e.g., React, Node.js, Python, AWS...)"
              required
            />
          </div>

          <div>
            <label htmlFor="expectedRole" className="block text-sm font-medium text-gray-300 mb-3">
              Expected Role
            </label>
            <input
              type="text"
              id="expectedRole"
              value={expectedRole}
              onChange={(e) => setExpectedRole(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-colors"
              placeholder="What role are you aiming for? (e.g., Full Stack Developer, DevOps Engineer...)"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-lime-500 hover:bg-lime-600 disabled:bg-lime-300 text-white font-medium py-4 px-6 rounded-full transition-colors duration-200 text-lg"
          >
            {isLoading ? 'Setting up your profile...' : 'Complete Setup'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            This information helps us create a personalized learning path for you
          </p>
        </div>
      </div>
      <FloatingChat />
    </div>
  );
};

export default UserInfoForm;