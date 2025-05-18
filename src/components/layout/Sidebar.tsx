import React from 'react';
import { useStore } from '../../lib/store';
import {
  Home,
  Award,
  Users,
  Settings,
  BookOpen,
  Code,
  BarChart,
  Video
} from 'lucide-react';
import Button from '../ui/Button';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button
    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium w-full transition-colors ${
      active
        ? 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-400'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
    }`}
    onClick={onClick}
  >
    <span className="flex-shrink-0">{icon}</span>
    <span>{label}</span>
  </button>
);

const Sidebar: React.FC = () => {
  const { sidebarOpen, currentUser, currentView, setCurrentView, logout } = useStore();

  if (!sidebarOpen) return null;

  console.log("Sidebar rendering with currentView:", currentView);

  const userStats = {
    rank: currentUser ? '42' : 'N/A',
    points: 1250,
    solvedChallenges: 15,
    streak: 7
  };

  const handleNavigation = (view: string) => {
    console.log(`Navigating to ${view}`);
    setCurrentView(view as any);
  };
  
  const handleHome = () => {
    console.log("Going to home/landing page");
    logout();
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex flex-col w-64 h-full bg-white border-r border-slate-200 pt-14 dark:border-slate-700 dark:bg-slate-900 md:pt-14">
      <div className="flex flex-col gap-1 px-3 py-4">
        <SidebarItem
          icon={<Home size={18} />}
          label="Home"
          active={false}
          onClick={handleHome}
        />
        <SidebarItem
          icon={<BarChart size={18} />}
          label="Dashboard"
          active={currentView === 'dashboard'}
          onClick={() => handleNavigation('dashboard')}
        />
        <SidebarItem
          icon={<Video size={18} />}
          label="Lectures"
          active={currentView === 'lectures'}
          onClick={() => handleNavigation('lectures')}
        />
        <SidebarItem
          icon={<Code size={18} />}
          label="Challenges"
          active={currentView === 'challenges'}
          onClick={() => handleNavigation('challenges')}
        />
        <SidebarItem
          icon={<BookOpen size={18} />}
          label="Learning Paths"
          active={currentView === 'learning'}
          onClick={() => handleNavigation('learning')}
        />
        <SidebarItem
          icon={<Users size={18} />}
          label="Community"
          active={currentView === 'community'}
          onClick={() => handleNavigation('community')}
        />
        <SidebarItem
          icon={<Award size={18} />}
          label="Leaderboard"
          active={currentView === 'leaderboard'}
          onClick={() => handleNavigation('leaderboard')}
        />
      </div>

      <div className="px-3 py-3 border-t border-slate-200 dark:border-slate-700">
        <h3 className="px-3 mb-2 text-xs font-medium uppercase text-slate-500 dark:text-slate-400">
          Stats
        </h3>
        <div className="grid grid-cols-2 gap-2 px-3 py-1 text-sm">
          <div>Rank:</div>
          <div className="font-medium text-right">{userStats.rank}</div>
          <div>Points:</div>
          <div className="font-medium text-right">{userStats.points.toLocaleString()}</div>
          <div>Solved:</div>
          <div className="font-medium text-right">{userStats.solvedChallenges}</div>
          <div>Streak:</div>
          <div className="font-medium text-right">{userStats.streak} days</div>
        </div>
      </div>

      <div className="px-3 py-4 mt-auto border-t border-slate-200 dark:border-slate-700">
        <Button variant="outline" className="justify-start w-full">
          <Settings size={16} className="mr-2" />
          Settings
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
