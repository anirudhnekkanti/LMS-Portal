import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';
import { getLearningPlan } from '../../api';

interface LearningPlan {
  title: string;
  tasks: string[];
}

const ContentLibraryView: React.FC = () => {
  const { learningPlan: contextPlan } = useApp();
  const [learningPlan, setLearningPlan] = useState<LearningPlan[]>(contextPlan || []);
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(!contextPlan);

  useEffect(() => {
    if (!contextPlan) {
      const fetchLearningPlan = async () => {
        try {
          const response = await getLearningPlan();
          if (response.success) {
            setLearningPlan(response.plan);
          }
        } catch (error) {
          console.error('Error fetching learning plan:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchLearningPlan();
    }
  }, [contextPlan]);

  const toggleSection = (index: number) => {
    setExpandedSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <div className="w-2 h-8 bg-lime-500 mr-4"></div>
              <h1 className="text-2xl font-bold text-white">
                Your Custom Learning Plan
              </h1>
            </div>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Continue
            </button>
          </div>
        </div>

        {/* Progress section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">Progress</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300">Completed 0 of {learningPlan.length} weeks</span>
            <span className="text-gray-300">0%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-lime-500 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div>

        {/* Learning plan accordion */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Content</h2>
                <p className="text-gray-400 text-sm">
                  {learningPlan.length} weeks • {learningPlan.reduce((acc, week) => acc + week.tasks.length, 0)} tasks
                </p>
              </div>
              <button
                onClick={() => setExpandedSections([])}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Collapse all sections
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-700">
            {learningPlan.map((week, index) => (
              <div key={index} className="p-6">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center">
                    {expandedSections.includes(index) ? (
                      <ChevronDown className="h-5 w-5 text-gray-400 mr-3" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400 mr-3" />
                    )}
                    <h3 className="text-white font-medium">{week.title}</h3>
                  </div>
                  <span className="text-gray-400 text-sm">{week.tasks.length} tasks</span>
                </div>

                {expandedSections.includes(index) && (
                  <div className="mt-4 ml-8 space-y-3">
                    {week.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{task}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLibraryView;