import React from 'react';
import { useStore } from './lib/store';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import ChallengeList from './components/features/ChallengeList';
import ChallengeDetail from './components/features/ChallengeDetail';
import Dashboard from './components/home/Dashboard';
import LeaderboardTable from './components/features/LeaderboardTable';
import LandingPage from './components/home/LandingPage';

function App() {
  const { sidebarOpen, currentChallenge, isAuthenticated } = useStore();
  const [activeView, setActiveView] = React.useState<'dashboard' | 'challenges' | 'leaderboard'>('dashboard');

  // For demo purposes, we'll show the dashboard by default
  React.useEffect(() => {
    // If a challenge is selected, show the challenge detail view
    if (currentChallenge) {
      setActiveView('challenges');
    }
  }, [currentChallenge]);

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      
      <div className={`flex min-h-screen w-full flex-col ${sidebarOpen ? 'md:ml-64' : ''}`}>
        <Header />
        
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="mx-auto max-w-6xl">
            {activeView === 'dashboard' && <Dashboard />}
            
            {activeView === 'challenges' && (
              currentChallenge ? <ChallengeDetail /> : <ChallengeList />
            )}
            
            {activeView === 'leaderboard' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Global Leaderboard</h1>
                  <p className="text-slate-500 dark:text-slate-400">
                    Top coders by points and challenges solved
                  </p>
                </div>
                
                <LeaderboardTable />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;