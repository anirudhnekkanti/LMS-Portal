import React, { useState, useEffect } from 'react';
import { getCourses } from '../../api';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
}

const TechnicalCoursesView: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses('technical');
        if (response.success) {
          setCourses(response.courses);
        }
      } catch (error) {
        console.error('Error fetching technical courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-6">
                  <div className="h-32 bg-gray-700 rounded mb-4"></div>
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
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
                Technical Courses
              </h1>
            </div>
            <p className="text-gray-400 mt-2">
              Master the latest technologies and frameworks
            </p>
          </div>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-lime-500 transition-colors cursor-pointer group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-lime-500 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{course.duration}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                </div>
                <button className="w-full mt-4 bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400">No technical courses available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalCoursesView;