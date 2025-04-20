import React from 'react';
import { useStore } from '../../lib/store';
import { Home, Award, Users, Settings, BookOpen, Code, BarChart, Zap, Video } from 'lucide-react';
import Button from '../ui/Button';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => {
  return (
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
};

const Sidebar: React.FC = () => {
  const { sidebarOpen, currentUser } = useStore();
  const [activeTab, setActiveTab] = React.useState('challenges');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  if (!sidebarOpen) return null;

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex flex-col w-64 h-full bg-white border-r border-slate-200 pt-14 dark:border-slate-700 dark:bg-slate-900 md:pt-14">
      <div className="flex flex-col gap-1 px-3 py-4">
        <SidebarItem 
          icon={<Home size={18} />} 
          label="Home" 
          active={activeTab === 'home'} 
          onClick={() => handleTabClick('home')}
        />
        <SidebarItem 
          icon={<BarChart size={18} />} 
          label="Dashboard" 
          active={activeTab === 'dashboard'} 
          onClick={() => handleTabClick('dashboard')}
        />
        <SidebarItem 
          icon={<Video size={18} />} 
          label="Lectures" 
          active={activeTab === 'lectures'} 
          onClick={() => handleTabClick('lectures')}
        />
        <SidebarItem 
          icon={<Code size={18} />} 
          label="Challenges" 
          active={activeTab === 'challenges'} 
          onClick={() => handleTabClick('challenges')}
        />
        <SidebarItem 
          icon={<BookOpen size={18} />} 
          label="Learning Paths" 
          active={activeTab === 'learning'} 
          onClick={() => handleTabClick('learning')}
        />
        <SidebarItem 
          icon={<Users size={18} />} 
          label="Community" 
          active={activeTab === 'community'} 
          onClick={() => handleTabClick('community')}
        />
        <SidebarItem 
          icon={<Award size={18} />} 
          label="Leaderboard" 
          active={activeTab === 'leaderboard'} 
          onClick={() => handleTabClick('leaderboard')}
        />
      </div>

      <div className="px-3 py-3 border-t border-slate-200 dark:border-slate-700">
        <h3 className="px-3 mb-2 text-xs font-medium uppercase text-slate-500 dark:text-slate-400">Stats</h3>
        <div className="grid grid-cols-2 gap-2 px-3 py-1 text-sm">
          <div>Rank:</div>
          <div className="font-medium text-right">{currentUser?.rank ?? 'N/A'}</div>

          <div>Points:</div>
          <div className="font-medium text-right">
            {typeof currentUser?.points === 'number' ? currentUser.points.toLocaleString() : '0'}
          </div>

          <div>Solved:</div>
          <div className="font-medium text-right">{currentUser?.solvedChallenges ?? 0}</div>

          <div>Streak:</div>
          <div className="font-medium text-right">{currentUser?.streak ? `${currentUser.streak} days` : '0 days'}</div>
        </div>
      </div>

      <div className="px-3 py-4 mt-auto border-t border-slate-200 dark:border-slate-700">
        <Button 
          variant="outline" 
          className="justify-start w-full"
          icon={<Settings size={16} />}
        >
          Settings
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
