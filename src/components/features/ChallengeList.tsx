import React from 'react';
import { useStore } from '../../lib/store';
import ChallengeCard from './ChallengeCard';
import { Search, Filter } from 'lucide-react';

const ChallengeList: React.FC = () => {
  const { challenges, setCurrentChallenge } = useStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [difficulty, setDifficulty] = React.useState<string>('all');
  const [category, setCategory] = React.useState<string>('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficulty === 'all' || challenge.difficulty === difficulty;
    const matchesCategory = category === 'all' || challenge.category === category;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(challenges.map(c => c.category)))];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Coding Challenges</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input 
            type="search" 
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search challenges..." 
            className="w-full py-2 pl-10 pr-4 text-sm text-slate-900 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Filter className="h-4 w-4 text-slate-500" />
        <span className="text-sm font-medium">Difficulty:</span>
        <div className="flex gap-2 flex-wrap">
          {['all', 'easy', 'medium', 'hard'].map(filter => (
            <button
              key={filter}
              className={`rounded-full px-3 py-1 text-xs capitalize ${
                difficulty === filter
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
              onClick={() => setDifficulty(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <span className="text-sm font-medium ml-4">Category:</span>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              className={`rounded-full px-3 py-1 text-xs ${
                category === cat
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredChallenges.map(challenge => (
          <ChallengeCard 
            key={challenge.id} 
            challenge={challenge}
            onClick={setCurrentChallenge}
          />
        ))}

        {filteredChallenges.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center h-60 text-center">
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">No challenges found</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeList;