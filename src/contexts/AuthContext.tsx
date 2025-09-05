import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  initials: string;
}

interface OnboardingData {
  yearsExperience: number;
  currentTechStack: string;
  desiredTechStack: string;
}

interface LearningPlan {
  title: string;
  tasks: string[];
}

interface AuthContextType {
  user: User | null;
  onboardingData: OnboardingData | null;
  learningPlan: LearningPlan[] | null;
  login: (email: string) => void;
  logout: () => void;
  completeOnboarding: (data: OnboardingData) => void;
  generateLearningPlan: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [learningPlan, setLearningPlan] = useState<LearningPlan[] | null>(null);

  const login = (email: string) => {
    const initials = email.split('@')[0].substring(0, 2).toUpperCase();
    setUser({ email, initials });
  };

  const logout = () => {
    setUser(null);
    setOnboardingData(null);
    setLearningPlan(null);
  };

  const completeOnboarding = (data: OnboardingData) => {
    setOnboardingData(data);
  };

  const generateLearningPlan = () => {
    // Mock learning plan generation
    const mockPlan: LearningPlan[] = [
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
    setLearningPlan(mockPlan);
  };

  const value = {
    user,
    onboardingData,
    learningPlan,
    login,
    logout,
    completeOnboarding,
    generateLearningPlan,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};