import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { getUserProgress } from '../../api';

interface Progress {
  completed: number;
  total: number;
  percentage: number;
  nextSteps: string[];
}

const HomeView: React.FC = () => {
  const { user } = useApp();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      
      try {
        const response = await getUserProgress(user.id);
        if (response.success) {
          setProgress(response.progress);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-2 bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <div className="w-2 h-8 bg-lime-500 mr-4"></div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {user?.name || 'User'}!
              </h1>
            </div>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Continue Learning
            </button>
          </div>
        </div>

        {/* Progress section */}
        {progress && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">Your Progress</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">
                Completed {progress.completed} of {progress.total} tasks
              </span>
              <span className="text-gray-300">{progress.percentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
              <div 
                className="bg-lime-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
            
            <h3 className="text-white font-medium mb-3">Next Steps</h3>
            <ul className="space-y-2">
              {progress.nextSteps.map((step, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-lime-500 rounded-full mr-3 flex-shrink-0"></div>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <h3 className="text-white font-medium">Courses Enrolled</h3>
            </div>
            <p className="text-2xl font-bold text-white mt-2">8</p>
            <p className="text-gray-400 text-sm">+2 this month</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h3 className="text-white font-medium">Certificates Earned</h3>
            </div>
            <p className="text-2xl font-bold text-white mt-2">3</p>
            <p className="text-gray-400 text-sm">+1 this week</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
              <h3 className="text-white font-medium">Study Streak</h3>
            </div>
            <p className="text-2xl font-bold text-white mt-2">12 days</p>
            <p className="text-gray-400 text-sm">Keep it up!</p>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="text-white">Completed "React Hooks Fundamentals"</p>
                  <p className="text-gray-400 text-sm">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="text-white">Started "AWS Lambda Introduction"</p>
                  <p className="text-gray-400 text-sm">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="text-white">Earned "TypeScript Basics" certificate</p>
                  <p className="text-gray-400 text-sm">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;