import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Search, Bell, ChevronDown } from 'lucide-react';
import FloatingChat from './FloatingChat';
import SearchModal from './SearchModal';
import NotificationDropdown from './NotificationDropdown';
import HomeView from './views/HomeView';
import ContentLibraryView from './views/ContentLibraryView';
import TechnicalCoursesView from './views/TechnicalCoursesView';
import SecurityTrainingView from './views/SecurityTrainingView';
import LeaderboardView from './views/LeaderboardView';

const DashboardPage: React.FC = () => {
  const { user, logout, currentView, setCurrentView } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'content-library', label: 'Content Library' },
    { id: 'technical-courses', label: 'Technical Courses' },
    { id: 'security-training', label: 'Security Training' },
    { id: 'leaderboard', label: 'Leaderboard' }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'content-library':
        return <ContentLibraryView />;
      case 'technical-courses':
        return <TechnicalCoursesView />;
      case 'security-training':
        return <SecurityTrainingView />;
      case 'leaderboard':
        return <LeaderboardView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800 border-r border-gray-700">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
            <div className="flex items-center">
              <div className="grid grid-cols-3 gap-1">
                <div className="w-2 h-2 bg-lime-500 rounded-sm"></div>
                <div className="w-2 h-2 bg-lime-500 rounded-sm"></div>
                <div className="w-2 h-2 bg-lime-500 rounded-sm"></div>
                <div className="w-2 h-2 bg-lime-500 rounded-sm"></div>
                <div className="w-2 h-2 bg-lime-500 rounded-sm"></div>
                <div className="w-2 h-2 bg-lime-500 rounded-sm"></div>
                <div className="w-2 h-2 bg-lime-500 rounded-sm"></div>
                <div className="w-2 h-2 bg-lime-500 rounded-sm"></div>
                <div className="w-2 h-2 bg-lime-500 rounded-sm"></div>
              </div>
              <span className="ml-3 text-white font-bold">Outskill</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <div className="text-gray-400 text-xs font-medium uppercase tracking-wider px-3 py-2">
                Learning Platform
              </div>
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full text-left group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === item.id
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-gray-800 border-b border-gray-700">
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex">
              <nav className="hidden md:flex space-x-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      currentView === item.id
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <button 
                onClick={() => setShowSearchModal(true)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="text-gray-300 hover:text-white relative transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </button>
                {showNotifications && (
                  <NotificationDropdown onClose={() => setShowNotifications(false)} />
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="bg-purple-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  {user?.initials || 'U'}
                </button>
                {showUserMenu && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        {user?.name || user?.email}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {renderCurrentView()}
        </main>
      </div>

      {/* Modals */}
      {showSearchModal && <SearchModal onClose={() => setShowSearchModal(false)} />}
      
      <FloatingChat />
    </div>
  );
};

export default DashboardPage;