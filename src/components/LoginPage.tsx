import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { loginUser } from '../api';
import FloatingChat from './FloatingChat';

const LoginPage: React.FC = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useApp();

  const handleEmailSignIn = () => {
    setShowEmailForm(true);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Replace with live API call when available
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password
      //   })
      // });
      // const data = await response.json();
      // if (response.ok) {
      //   localStorage.setItem('authToken', data.token);
      //   localStorage.setItem('userId', data.user.id);
      //   login(data.userData);
      // } else {
      //   setError(data.error || 'Login failed');
      // }

      // Using mock API for now
      const response = await loginUser(email, password);
      if (response.success) {
        login(response.userData);
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToOptions = () => {
    setShowEmailForm(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Three green dots header */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
            <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
            <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
          </div>
        </div>

        {!showEmailForm ? (
          <>
            {/* Login options */}
            <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              Log in to your account
            </h1>

            <div className="space-y-4">
              <button className="w-full bg-lime-500 hover:bg-lime-600 text-white font-medium py-3 px-4 rounded-full transition-colors duration-200">
                Continue with Google
              </button>

              <button
                onClick={handleEmailSignIn}
                className="w-full bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-full transition-colors duration-200"
              >
                Sign in with your email
              </button>
            </div>

            <div className="mt-6 text-center">
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Forgot your password?
              </a>
            </div>
          </>
        ) : (
          <>
            {/* Email/Password form */}
            <div className="flex items-center mb-6">
              <button
                onClick={handleBackToOptions}
                className="text-gray-400 hover:text-gray-600 mr-3"
              >
                ←
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Sign in with email
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-lime-500 hover:bg-lime-600 disabled:bg-lime-300 text-white font-medium py-3 px-4 rounded-full transition-colors duration-200"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Forgot your password?
              </a>
              <div className="mt-2 text-xs text-gray-500">
                Try: user@example.com / password123 (existing user)<br />
                Or: anirudh@example.com / password123 (new user)
              </div>
            </div>
          </>
        )}
      </div>
      <FloatingChat />
    </div>
  );
};

export default LoginPage;