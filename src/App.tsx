import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import LoginPage from './components/LoginPage';
import OnboardingPage from './components/OnboardingPage';
import DashboardPage from './components/DashboardPage';

const AppRouter: React.FC = () => {
  const { user, isAuthenticated } = useApp();

  // Determine which page to show based on user state
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Check if user is new (doesn't have onboarding data)
  if (user && !user.onboardingData) {
    return <OnboardingPage />;
  }

  return <DashboardPage />;
};

function App() {
  return (
    <AppProvider>
      <div className="App">
        <AppRouter />
      </div>
    </AppProvider>
  );
}

export default App;