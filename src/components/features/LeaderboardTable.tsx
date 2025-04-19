import React from 'react';
import { USERS } from '../../lib/users';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { Trophy } from 'lucide-react';

const LeaderboardTable: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
              <th className="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400">Rank</th>
              <th className="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400">User</th>
              <th className="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400">Points</th>
              <th className="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400">Solved</th>
              <th className="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400">Streak</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((user, i) => (
              <tr 
                key={user.id}
                className={`border-b border-slate-200 bg-white last:border-0 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 ${
                  i === 0 ? 'bg-amber-50 dark:bg-amber-900/20' : ''
                }`}
              >
                <td className="px-4 py-3 font-medium">
                  {i < 3 ? (
                    <span className="flex items-center justify-center h-6 w-6 rounded-full">
                      <Trophy 
                        size={16} 
                        className={i === 0 
                          ? 'text-amber-500' 
                          : i === 1 
                            ? 'text-slate-400' 
                            : 'text-amber-700'}
                      />
                    </span>
                  ) : (
                    user.rank
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar 
                      src={user.avatarUrl} 
                      alt={user.username} 
                      size="sm" 
                    />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {user.username}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Joined {new Date(user.joinedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">
                  {user.points.toLocaleString()}
                </td>
                <td className="px-4 py-3">{user.solvedChallenges}</td>
                <td className="px-4 py-3">
                  <Badge 
                    size="sm" 
                    variant={user.streak > 7 ? 'primary' : 'default'}
                  >
                    {user.streak} days
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;