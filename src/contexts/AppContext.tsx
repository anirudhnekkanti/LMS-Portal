import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  initials: string;
  hasCompletedUserInfo?: boolean;
  progress?: {
    completed: number;
    total: number;
    percentage: number;
  };
  onboardingData?: {
    yearsExperience: number;
    currentTechStack: string;
    desiredTechStack: string;
  };
}

interface OnboardingData {
  yearsExperience: number;
  currentTechStack: string;
  desiredTechStack: string;
}

interface UserInfoData {
  experienceYears: number;
  currentTechStack: string;
  expectedRole: string;
}

interface LearningPlan {
  title: string;
  tasks: string[];
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  learningPlan: LearningPlan[] | null;
  currentView: string;
  login: (userData: User) => void;
  logout: () => void;
  completeOnboarding: (data: OnboardingData, plan: LearningPlan[]) => void;
  completeUserInfo: (data: UserInfoData) => void;
  setCurrentView: (view: string) => void;
  setLearningPlan: (plan: LearningPlan[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [learningPlan, setLearningPlan] = useState<LearningPlan[] | null>(null);
  const [currentView, setCurrentView] = useState('personalized-learning');

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setLearningPlan(null);
    setCurrentView('personalized-learning');
  };

  const completeOnboarding = (data: OnboardingData, plan: LearningPlan[]) => {
    if (user) {
      setUser({
        ...user,
        onboardingData: data,
        hasCompletedUserInfo: true
      });
    }
    setLearningPlan(plan);
  };

  const completeUserInfo = (data: UserInfoData) => {
    if (user) {
      setUser({
        ...user,
        hasCompletedUserInfo: true,
        onboardingData: {
          yearsExperience: data.experienceYears,
          currentTechStack: data.currentTechStack,
          desiredTechStack: data.expectedRole
        }
      });
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    learningPlan,
    currentView,
    login,
    logout,
    completeOnboarding,
    completeUserInfo,
    setCurrentView,
    setLearningPlan,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};