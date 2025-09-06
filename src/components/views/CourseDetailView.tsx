import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, FileText, Clock, CheckCircle } from 'lucide-react';

interface CourseContent {
  id: number;
  title: string;
  type: 'video' | 'article' | 'exercise';
  duration: string;
  completed: boolean;
}

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  totalDuration: string;
  difficulty: string;
  contents: CourseContent[];
}

interface CourseDetailViewProps {
  courseId: string;
  onBack: () => void;
  onComplete: () => void;
}

// Mock course detail data
const mockCourseDetail: CourseDetail = {
  id: 'week1-react-hooks',
  title: 'Week 1: Mastering Advanced React Hooks',
  description: 'Deep dive into advanced React hooks patterns and best practices. Learn how to create custom hooks, optimize performance, and manage complex state.',
  totalDuration: '4 hours 30 minutes',
  difficulty: 'Intermediate',
  contents: [
    {
      id: 1,
      title: 'Introduction to Advanced Hooks',
      type: 'video',
      duration: '15 min',
      completed: false
    },
    {
      id: 2,
      title: 'Understanding useEffect Dependencies',
      type: 'video',
      duration: '25 min',
      completed: false
    },
    {
      id: 3,
      title: 'useEffect Best Practices Guide',
      type: 'article',
      duration: '10 min',
      completed: false
    },
    {
      id: 4,
      title: 'Mastering useReducer Hook',
      type: 'video',
      duration: '30 min',
      completed: false
    },
    {
      id: 5,
      title: 'useReducer vs useState: When to Use What',
      type: 'article',
      duration: '8 min',
      completed: false
    },
    {
      id: 6,
      title: 'Building Custom Hooks',
      type: 'video',
      duration: '35 min',
      completed: false
    },
    {
      id: 7,
      title: 'Custom Hooks Exercise',
      type: 'exercise',
      duration: '45 min',
      completed: false
    },
    {
      id: 8,
      title: 'Performance Optimization with useMemo',
      type: 'video',
      duration: '20 min',
      completed: false
    },
    {
      id: 9,
      title: 'useCallback for Function Memoization',
      type: 'video',
      duration: '18 min',
      completed: false
    },
    {
      id: 10,
      title: 'Advanced Hooks Patterns',
      type: 'article',
      duration: '12 min',
      completed: false
    }
  ]
};

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ courseId, onBack, onComplete }) => {
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        // TODO: Replace with live API call when available
        // const response = await fetch(`/api/courses/${courseId}/detail`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        //   }
        // });
        // const data = await response.json();
        // if (response.ok) {
        //   setCourseDetail(data.courseDetail);
        //   setCompletedItems(data.completedItems || []);
        // } else {
        //   console.error('Failed to fetch course detail:', data.error);
        // }
        
        // Using mock data for now
        await new Promise(resolve => setTimeout(resolve, 800));
        setCourseDetail(mockCourseDetail);
        setCompletedItems([]);
      } catch (error) {
        console.error('Error fetching course detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetail();
  }, [courseId]);

  const handleItemComplete = (itemId: number) => {
    setCompletedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-5 w-5 text-blue-500" />;
      case 'article':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'exercise':
        return <Clock className="h-5 w-5 text-orange-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-blue-100 text-blue-800';
      case 'article':
        return 'bg-green-100 text-green-800';
      case 'exercise':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const allItemsCompleted = courseDetail?.contents.every(item => 
    completedItems.includes(item.id)
  ) || false;

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-4">
                  <div className="h-5 bg-gray-700 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!courseDetail) {
    return (
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">Course not found.</p>
            <button
              onClick={onBack}
              className="mt-4 text-lime-500 hover:text-lime-400 transition-colors"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white mr-4 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">{courseDetail.title}</h1>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-400">
              <span>{courseDetail.totalDuration}</span>
              <span>•</span>
              <span>{courseDetail.difficulty}</span>
              <span>•</span>
              <span>{completedItems.length} of {courseDetail.contents.length} completed</span>
            </div>
          </div>
        </div>

        {/* Course Description */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-3">About This Course</h2>
          <p className="text-gray-300 leading-relaxed">{courseDetail.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-medium">Progress</h3>
            <span className="text-gray-300">
              {Math.round((completedItems.length / courseDetail.contents.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-lime-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(completedItems.length / courseDetail.contents.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Course Contents */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Course Content</h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="divide-y divide-gray-700">
              {courseDetail.contents.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 hover:bg-gray-750 transition-colors cursor-pointer ${
                    completedItems.includes(item.id) ? 'bg-gray-750' : ''
                  }`}
                  onClick={() => handleItemComplete(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {completedItems.includes(item.id) ? (
                          <CheckCircle className="h-5 w-5 text-lime-500" />
                        ) : (
                          getContentIcon(item.type)
                        )}
                      </div>
                      <div>
                        <h3 className={`font-medium ${
                          completedItems.includes(item.id) 
                            ? 'text-lime-500 line-through' 
                            : 'text-white'
                        }`}>
                          {item.title}
                        </h3>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className={`text-xs px-2 py-1 rounded ${getTypeColor(item.type)}`}>
                            {item.type}
                          </span>
                          <span className="text-gray-400 text-sm">{item.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complete Button */}
        <div className="text-center">
          <button
            onClick={onComplete}
            disabled={!allItemsCompleted}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              allItemsCompleted
                ? 'bg-lime-500 hover:bg-lime-600 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {allItemsCompleted ? 'Complete Course & Take Quiz' : 'Complete All Items First'}
          </button>
          {!allItemsCompleted && (
            <p className="text-gray-400 text-sm mt-2">
              Complete all course items to unlock the quiz
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailView;