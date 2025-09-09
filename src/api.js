// Mock API layer - all async functions that simulate backend calls
// This file can be easily replaced with real AWS Lambda fetch calls later

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUsers = {
  'user@example.com': {
    id: 1,
    email: 'user@example.com',
    name: 'John Doe',
    initials: 'JD',
    isNew: false,
    progress: {
      completed: 12,
      total: 20,
      percentage: 60
    },
    onboardingData: {
      yearsExperience: 3,
      currentTechStack: 'React, Node.js, MongoDB',
      desiredTechStack: 'AWS, TypeScript, GraphQL'
    }
  }
};

// Mock courses data
const mockCourses = {
  technical: [
    {
      id: 1,
      title: 'Advanced React Patterns',
      description: 'Master advanced React concepts and patterns',
      duration: '8 hours',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'AWS Lambda Fundamentals',
      description: 'Learn serverless computing with AWS Lambda',
      duration: '6 hours',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'TypeScript Mastery',
      description: 'Complete guide to TypeScript development',
      duration: '10 hours',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'GraphQL API Design',
      description: 'Build efficient APIs with GraphQL',
      duration: '7 hours',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ],
  security: [
    {
      id: 5,
      title: 'Web Security Fundamentals',
      description: 'Essential security practices for web developers',
      duration: '5 hours',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 6,
      title: 'OAuth 2.0 Implementation',
      description: 'Secure authentication with OAuth 2.0',
      duration: '4 hours',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 7,
      title: 'HTTPS and SSL/TLS',
      description: 'Secure communication protocols',
      duration: '3 hours',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ]
};

// Mock learning plan data
const mockLearningPlan = [
  {
    title: "Week 1: Mastering Advanced React Hooks",
    tasks: [
      "Understand useEffect dependencies",
      "Master the use of useReducer",
      "Create custom hooks for reusable logic"
    ]
  },
  {
    title: "Week 2: Introduction to AWS Lambda",
    tasks: [
      "Set up your first Lambda function",
      "Connect Lambda to an API Gateway",
      "Manage permissions with IAM roles"
    ]
  },
  {
    title: "Week 3: Full-Stack Deployment",
    tasks: [
      "Deploy the React frontend to Netlify",
      "Deploy the Node.js backend to Lambda",
      "Configure CI/CD pipeline"
    ]
  }
];

// Mock leaderboard data
const mockLeaderboard = [
  { id: 1, name: 'Jane Doe', score: 950, rank: 1, avatar: 'JD' },
  { id: 2, name: 'John Smith', score: 920, rank: 2, avatar: 'JS' },
  { id: 3, name: 'Alice Johnson', score: 890, rank: 3, avatar: 'AJ' },
  { id: 4, name: 'Bob Wilson', score: 860, rank: 4, avatar: 'BW' },
  { id: 5, name: 'Carol Brown', score: 830, rank: 5, avatar: 'CB' },
  { id: 6, name: 'David Lee', score: 800, rank: 6, avatar: 'DL' },
  { id: 7, name: 'Eva Martinez', score: 770, rank: 7, avatar: 'EM' },
  { id: 8, name: 'Frank Taylor', score: 740, rank: 8, avatar: 'FT' }
];

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    message: 'Assessment for "React Hooks" is due tomorrow',
    date: '2023-10-27',
    read: false
  },
  {
    id: 2,
    message: 'New course "AWS Lambda Fundamentals" is now available',
    date: '2023-10-26',
    read: false
  },
  {
    id: 3,
    message: 'You completed "TypeScript Basics" - Great job!',
    date: '2023-10-25',
    read: true
  }
];

// Dummy user data
const DUMMY_USER = {
  id: 1,
  email: 'user@example.com',
  name: 'John Doe',
  initials: 'JD',
  hasCompletedUserInfo: true,
  progress: {
    completed: 12,
    total: 20,
    percentage: 60
  },
  onboardingData: {
    yearsExperience: 5,
    currentTechStack: 'React, Node.js, MongoDB',
    desiredTechStack: 'React, AWS Lambda, DynamoDB'
  }
};

const DUMMY_NEW_USER = {
  id: 2,
  email: 'anirudh@example.com',
  name: 'Anirudh Sharma',
  initials: 'AS',
  hasCompletedUserInfo: false,
  progress: {
    completed: 0,
    total: 20,
    percentage: 0
  }
};

// Authentication function
export const loginUser = async (email, password) => {
  await delay(1000); // Simulate network delay
  
  // Simple dummy authentication
  if (password === 'password123') {
    if (email === 'user@example.com') {
      // Existing user with onboarding data
      return {
        success: true,
        userData: DUMMY_USER
      };
    } else if (email === 'anirudh@example.com') {
      // New user without user info
      return {
        success: true,
        userData: DUMMY_NEW_USER
      };
    }
  }
  
  return {
    success: false,
    error: 'Invalid email or password'
  };
};

export const submitOnboarding = async (data) => {
  await delay(1500); // Simulate network delay
  
  // Simulate saving to database
  return {
    success: true,
    learningPlan: mockLearningPlan
  };
};

// Course functions
export const getCourses = async (category) => {
  await delay(800);
  
  return {
    success: true,
    courses: mockCourses[category] || []
  };
};

export const searchCourses = async (query) => {
  await delay(600);
  
  const allCourses = [...mockCourses.technical, ...mockCourses.security];
  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(query.toLowerCase()) ||
    course.description.toLowerCase().includes(query.toLowerCase())
  );
  
  return {
    success: true,
    courses: filteredCourses
  };
};

// User progress functions
export const getUserProgress = async (userId) => {
  await delay(500);
  
  return {
    success: true,
    progress: {
      completed: 12,
      total: 20,
      percentage: 60,
      nextSteps: [
        'Complete React Hooks assessment',
        'Start AWS Lambda course',
        'Review TypeScript fundamentals'
      ]
    }
  };
};

// Leaderboard functions
export const getLeaderboardData = async () => {
  await delay(700);
  
  return {
    success: true,
    leaderboard: mockLeaderboard
  };
};

// Notification functions
export const getNotifications = async () => {
  await delay(400);
  
  return {
    success: true,
    notifications: mockNotifications
  };
};

export const markNotificationAsRead = async (notificationId) => {
  await delay(300);
  
  return {
    success: true
  };
};

// Chat functions
export const postChatMessage = async (message) => {
  await delay(1000); // Simulate AI processing time
  
  const responses = [
    `I am a mock AI assistant. Your query about "${message}" has been noted.`,
    `Thank you for your message: "${message}". I'm here to help with your learning journey!`,
    `I understand you're asking about "${message}". Let me help you with that topic.`,
    `Great question about "${message}"! I'll provide you with relevant resources soon.`
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return {
    success: true,
    response: randomResponse,
    timestamp: new Date().toISOString()
  };
};

// Learning plan functions
export const getLearningPlan = async () => {
  await delay(600);
  
  return {
    success: true,
    plan: mockLearningPlan
  };
};

// Course detail functions
export const getCourseDetail = async (courseId) => {
  await delay(800);
  
  // Mock course detail based on courseId
  const mockCourseDetail = {
    id: courseId,
    title: 'Week 1: Mastering Advanced React Hooks',
    description: 'Deep dive into advanced React hooks patterns and best practices.',
    totalDuration: '4 hours 30 minutes',
    difficulty: 'Intermediate',
    contents: [
      { id: 1, title: 'Introduction to Advanced Hooks', type: 'video', duration: '15 min', completed: false },
      { id: 2, title: 'Understanding useEffect Dependencies', type: 'video', duration: '25 min', completed: false },
      { id: 3, title: 'Building Custom Hooks', type: 'video', duration: '35 min', completed: false }
    ]
  };
  
  return {
    success: true,
    courseDetail: mockCourseDetail,
    completedItems: []
  };
};

// Quiz functions
export const getQuizData = async (courseId) => {
  await delay(600);
  
  const mockQuiz = {
    id: `${courseId}-quiz`,
    title: 'React Hooks Mastery Quiz',
    description: 'Test your understanding of advanced React hooks concepts',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'When should you use useReducer instead of useState?',
        options: [
          'When you have simple state updates',
          'When you have complex state logic with multiple sub-values',
          'When you want to optimize performance',
          'When you need to share state between components'
        ],
        correctAnswer: 1,
        explanation: 'useReducer is preferable when you have complex state logic that involves multiple sub-values.'
      },
      {
        id: 2,
        question: 'What is the main purpose of the dependency array in useEffect?',
        options: [
          'To prevent memory leaks',
          'To control when the effect should run',
          'To optimize component rendering',
          'To handle async operations'
        ],
        correctAnswer: 1,
        explanation: 'The dependency array controls when the effect should run based on value changes.'
      },
      {
        id: 3,
        question: 'Which hook would you use to memoize an expensive calculation?',
        options: [
          'useCallback',
          'useEffect',
          'useMemo',
          'useReducer'
        ],
        correctAnswer: 2,
        explanation: 'useMemo is used to memoize expensive calculations and optimize performance.'
      }
    ]
  };
  
  return {
    success: true,
    quiz: mockQuiz
  };
};

export const submitQuizAnswers = async (courseId, answers) => {
  await delay(1000);
  
  return {
    success: true,
    score: 85,
    passed: true,
    results: answers
  };
};