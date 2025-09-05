import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  initials: string;
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
  setCurrentView: (view: string) => void;
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
  const [currentView, setCurrentView] = useState('home');

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setLearningPlan(null);
    setCurrentView('home');
  };

  const completeOnboarding = (data: OnboardingData, plan: LearningPlan[]) => {
    if (user) {
      setUser({
        ...user,
        onboardingData: data
      });
    }
    setLearningPlan(plan);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    learningPlan,
    currentView,
    login,
    logout,
    completeOnboarding,
    setCurrentView,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};