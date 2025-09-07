import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Award } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number;
}

interface QuizViewProps {
  courseTitle: string;
  topicTitle: string;
  onBack: () => void;
  onComplete: (score: number, passed: boolean) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ courseTitle, topicTitle, onBack, onComplete }) => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // Call the live API to get quiz questions
        const response = await fetch('http://127.0.0.1:5000/api/quiz/generate', {
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
          // Transform API response to match our QuizData interface
          const transformedQuiz: QuizData = {
            id: `${courseTitle}-${topicTitle}`.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            title: `${topicTitle} Quiz`,
            description: `Test your understanding of ${topicTitle}`,
            passingScore: 70,
            questions: data.questions.map((q: any, index: number) => ({
              id: index + 1,
              question: q.question,
              options: q.options,
              correctAnswer: q.options.indexOf(q.answer),
              explanation: `The correct answer is: ${q.answer}`
            }))
          };
          
          setQuizData(transformedQuiz);
          setSelectedAnswers(new Array(transformedQuiz.questions.length).fill(-1));
        } else {
          console.error('Failed to fetch quiz data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizData();
  }, [courseTitle, topicTitle]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < (quizData?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!quizData) return;

    try {
      // For now, we'll validate answers locally since the API provides the correct answers
      // In the future, you might want to submit answers to the backend for validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const calculateScore = () => {
    if (!quizData) return 0;
    
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return answer === quizData.questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    
    return Math.round((correctAnswers / quizData.questions.length) * 100);
  };

  const score = calculateScore();
  const passed = score >= (quizData?.passingScore || 70);

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
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

  if (!quizData) {
    return (
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">Quiz not found.</p>
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

  if (showResults) {
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
            <h1 className="text-2xl font-bold text-white">Quiz Results</h1>
          </div>

          {/* Results Summary */}
          <div className="bg-gray-800 rounded-lg p-8 mb-6 border border-gray-700 text-center">
            <div className="mb-6">
              {passed ? (
                <Award className="h-16 w-16 text-lime-500 mx-auto mb-4" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              <h2 className={`text-3xl font-bold mb-2 ${passed ? 'text-lime-500' : 'text-red-500'}`}>
                {score}%
              </h2>
              <p className="text-gray-300 text-lg">
                {passed ? 'Congratulations! You passed!' : 'Keep studying and try again!'}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">{selectedAnswers.filter((answer, index) => answer === quizData.questions[index].correctAnswer).length}</p>
                <p className="text-gray-400">Correct</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{selectedAnswers.filter((answer, index) => answer !== quizData.questions[index].correctAnswer && answer !== -1).length}</p>
                <p className="text-gray-400">Incorrect</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{quizData.passingScore}%</p>
                <p className="text-gray-400">Passing Score</p>
              </div>
            </div>
          </div>

          {/* Question Review */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Review Your Answers</h3>
            </div>
            <div className="divide-y divide-gray-700">
              {quizData.questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-lime-500 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-3">
                          Question {index + 1}: {question.question}
                        </h4>
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border ${
                                optionIndex === question.correctAnswer
                                  ? 'border-lime-500 bg-lime-500/10 text-lime-500'
                                  : optionIndex === userAnswer && !isCorrect
                                  ? 'border-red-500 bg-red-500/10 text-red-500'
                                  : 'border-gray-600 text-gray-300'
                              }`}
                            >
                              {option}
                              {optionIndex === question.correctAnswer && (
                                <span className="ml-2 text-sm">(Correct)</span>
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <span className="ml-2 text-sm">(Your answer)</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4">
                          <p className="text-gray-300 text-sm">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-x-4">
            <button
              onClick={() => onComplete(score, passed)}
              className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Continue Learning
            </button>
            {!passed && (
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswers(new Array(quizData.questions.length).fill(-1));
                  setShowResults(false);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Retake Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizData.questions[currentQuestion];
  const allQuestionsAnswered = selectedAnswers.every(answer => answer !== -1);

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
            <h1 className="text-2xl font-bold text-white">{quizData.title}</h1>
            <p className="text-gray-400 mt-1">{quizData.description}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">
              Question {currentQuestion + 1} of {quizData.questions.length}
            </span>
            <span className="text-gray-400">
              {Math.round(((currentQuestion + 1) / quizData.questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-lime-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6">
            {currentQ.question}
          </h2>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-lime-500 bg-lime-500/10 text-lime-500'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-lime-500 bg-lime-500'
                      : 'border-gray-500'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="flex space-x-2">
            {quizData.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-lime-500 text-white'
                    : selectedAnswers[index] !== -1
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === quizData.questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={!allQuestionsAnswered}
              className="px-6 py-2 rounded-lg bg-lime-500 hover:bg-lime-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium transition-colors"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === -1}
              className="px-6 py-2 rounded-lg bg-lime-500 hover:bg-lime-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium transition-colors"
            >
              Next
            </button>
          )}
        </div>

        {!allQuestionsAnswered && (
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Please answer all questions before submitting the quiz
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizView;