import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface TopicContent {
  title: string;
  description: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
  external_links: Array<{
    title: string;
    url: string;
  }>;
  quizAvailable: boolean;
}

interface TopicDetailViewProps {
  courseTitle: string;
  topicTitle: string;
  onBack: () => void;
  onComplete: () => void;
}

const TopicDetailView: React.FC<TopicDetailViewProps> = ({ 
  courseTitle, 
  topicTitle, 
  onBack, 
  onComplete 
}) => {
  const [topicContent, setTopicContent] = useState<TopicContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopicContent = async () => {
      try {
        // Call the live API to get topic content
        const response = await fetch('http://127.0.0.1:5000/api/course/content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            courseTitle: courseTitle,
            topicTitle: topicTitle
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Transform API response to match our interface
          const transformedContent: TopicContent = {
            title: data.content.title,
            description: data.content.description,
            sections: data.content.sections || [],
            external_links: data.content.external_links || [],
            quizAvailable: data.quizAvailable
          };
          setTopicContent(transformedContent);
        } else {
          console.error('Failed to fetch topic content:', data.error);
        }
      } catch (error) {
        console.error('Error fetching topic content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopicContent();
  }, [courseTitle, topicTitle]);

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!topicContent) {
    return (
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">Topic content not found.</p>
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
            <h1 className="text-2xl font-bold text-white">{topicContent.title}</h1>
            <p className="text-gray-400 mt-1">{courseTitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed mb-6" style={{ lineHeight: '1.8' }}>
            {topicContent.description}
          </p>

          {/* Sections */}
          {topicContent.sections && topicContent.sections.length > 0 && (
            <div className="space-y-6">
              {topicContent.sections.map((section, index) => (
                <div key={index} className="border-l-4 border-lime-500 pl-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed" style={{ lineHeight: '1.8' }}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* External Links Section */}
        {topicContent.external_links && topicContent.external_links.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">External Resources</h2>
            <div className="space-y-3">
              {topicContent.external_links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors group"
                >
                  <ExternalLink className="h-5 w-5 text-lime-500 mr-3 flex-shrink-0" />
                  <span className="text-white group-hover:text-lime-500 transition-colors">
                    {link.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Complete Button */}
        <div className="text-center">
          <button
            onClick={onComplete}
            disabled={!topicContent.quizAvailable}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              topicContent.quizAvailable
                ? 'bg-lime-500 hover:bg-lime-600 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {topicContent.quizAvailable ? 'Complete Module & Take Quiz' : 'Quiz Not Available'}
          </button>
          {!topicContent.quizAvailable && (
            <p className="text-gray-400 text-sm mt-2">
              Quiz is not available for this topic
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicDetailView;