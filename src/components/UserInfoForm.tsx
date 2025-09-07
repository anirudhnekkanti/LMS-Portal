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
  const { user, completeUserInfo, setLearningPlan } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const userInfoData: UserInfoData = {
      experienceYears,
      currentTechStack,
      expectedRole,
    };

    try {
      // Call the live API to generate personalized content
      const response = await fetch('http://127.0.0.1:5000/api/courses/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          experience: `${experienceYears} years`,
          techStack: currentTechStack,
          expectedRole: expectedRole
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Transform the API response to match our learning plan format
        const transformedPlan = data.content.map((week: any) => ({
          title: week.title,
          tasks: week.tasks.map((task: any) => task.title)
        }));
        
        // Update the learning plan with the API response
        setLearningPlan(transformedPlan);
        
        // Complete user info
        completeUserInfo(userInfoData);
      } else {
        console.error('Failed to generate learning plan:', data.error);
        // Fallback to completing user info without custom plan
        completeUserInfo(userInfoData);
      }
    } catch (error) {
      console.error('Error submitting user info:', error);
      // Fallback to mock data if API fails
      const mockLearningPlan = [
        {
          title: "Week 1: Mastering Advanced React Hooks",
          tasks: [
            { id: "react-hooks-deps", title: "Understand useEffect dependencies", completed: false },
            { id: "react-hooks-reducer", title: "Master the use of useReducer", completed: false },
            { id: "react-hooks-custom", title: "Create custom hooks for reusable logic", completed: false }
          ]
        },
        {
          title: "Week 2: Introduction to AWS Lambda",
          tasks: [
            { id: "lambda-setup", title: "Set up your first Lambda function", completed: false },
            { id: "lambda-api-gateway", title: "Connect Lambda to an API Gateway", completed: false },
            { id: "lambda-iam", title: "Manage permissions with IAM roles", completed: false }
          ]
        }
      ];
      
      setLearningPlan(mockLearningPlan);
      completeUserInfo(userInfoData);
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