import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { submitOnboarding } from '../api';
import FloatingChat from './FloatingChat';

const OnboardingPage: React.FC = () => {
  const [yearsExperience, setYearsExperience] = useState<number>(0);
  const [currentTechStack, setCurrentTechStack] = useState('');
  const [desiredTechStack, setDesiredTechStack] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { completeOnboarding } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const onboardingData = {
      yearsExperience,
      currentTechStack,
      desiredTechStack,
    };

    try {
      // TODO: Replace with live API call when available
      // const response = await fetch('/api/onboarding', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify({
      //     userId: localStorage.getItem('userId'),
      //     ...onboardingData
      //   })
      // });
      // const data = await response.json();
      // if (response.ok) {
      //   completeOnboarding(onboardingData, data.learningPlan);
      // } else {
      //   console.error('Failed to submit onboarding:', data.error);
      // }

      // Using mock API for now
      const response = await submitOnboarding(onboardingData);
      if (response.success) {
        completeOnboarding(onboardingData, response.learningPlan);
      }
    } catch (error) {
      console.error('Error submitting onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-2xl border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Tell Us About Yourself
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-3">
              Years of Experience
            </label>
            <input
              type="number"
              id="experience"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(Number(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-colors"
              placeholder="Enter your years of experience"
              min="0"
              required
            />
          </div>

          <div>
            <label htmlFor="currentTech" className="block text-sm font-medium text-gray-300 mb-3">
              Current Experience with Technologies
            </label>
            <textarea
              id="currentTech"
              value={currentTechStack}
              onChange={(e) => setCurrentTechStack(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-colors resize-none h-32"
              placeholder="List the technologies you're currently working with (e.g., React, Node.js, Python...)"
              required
            />
          </div>

          <div>
            <label htmlFor="desiredTech" className="block text-sm font-medium text-gray-300 mb-3">
              Desired Tech Stack
            </label>
            <textarea
              id="desiredTech"
              value={desiredTechStack}
              onChange={(e) => setDesiredTechStack(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-colors resize-none h-32"
              placeholder="List the technologies you want to learn or improve (e.g., AWS, TypeScript, GraphQL...)"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-lime-500 hover:bg-lime-600 disabled:bg-lime-300 text-white font-medium py-4 px-6 rounded-full transition-colors duration-200 text-lg"
          >
            {isLoading ? 'Generating Plan...' : 'Generate My Custom Plan'}
          </button>
        </form>
      </div>
      <FloatingChat />
    </div>
  );
};

export default OnboardingPage;