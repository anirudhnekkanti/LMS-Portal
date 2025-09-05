import React, { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Trophy, Medal, Award } from 'lucide-react';
import { getLeaderboardData } from '../../api';

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  rank: number;
  avatar: string;
}

const LeaderboardView: React.FC = () => {
  const { user } = useApp();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboardData();
        if (response.success) {
          setLeaderboard(response.leaderboard);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-gray-400 font-bold text-lg">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-yellow-500 bg-yellow-50';
      case 2:
        return 'border-gray-400 bg-gray-50';
      case 3:
        return 'border-amber-600 bg-amber-50';
      default:
        return 'border-gray-700';
    }
  };

  const isCurrentUser = (entry: LeaderboardEntry) => {
    return user && (entry.name === user.name || entry.avatar === user.initials);
  };

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                    </div>
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                  </div>
                ))}
              </div>
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
                Leaderboard
              </h1>
            </div>
            <p className="text-gray-400 mt-2">
              See how you rank among other learners
            </p>
          </div>
        </div>

        {/* Top 3 podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {leaderboard.slice(0, 3).map((entry) => (
            <div
              key={entry.id}
              className={`bg-gray-800 rounded-lg p-6 border-2 text-center ${getRankColor(entry.rank)} ${
                isCurrentUser(entry) ? 'ring-2 ring-lime-500' : ''
              }`}
            >
              <div className="flex justify-center mb-4">
                {getRankIcon(entry.rank)}
              </div>
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                {entry.avatar}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {entry.name}
                {isCurrentUser(entry) && (
                  <span className="text-lime-500 text-sm ml-2">(You)</span>
                )}
              </h3>
              <p className="text-2xl font-bold text-lime-500">{entry.score}</p>
              <p className="text-gray-400 text-sm">points</p>
            </div>
          ))}
        </div>

        {/* Full leaderboard */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Full Rankings</h2>
          </div>
          <div className="divide-y divide-gray-700">
            {leaderboard.map((entry) => (
              <div
                key={entry.id}
                className={`p-6 flex items-center justify-between hover:bg-gray-750 transition-colors ${
                  isCurrentUser(entry) ? 'bg-gray-750 border-l-4 border-lime-500' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(entry.rank)}
                  </div>
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {entry.avatar}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {entry.name}
                      {isCurrentUser(entry) && (
                        <span className="text-lime-500 text-sm ml-2">(You)</span>
                      )}
                    </h3>
                    <p className="text-gray-400 text-sm">Rank #{entry.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">{entry.score}</p>
                  <p className="text-gray-400 text-sm">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {leaderboard.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400">No leaderboard data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardView;