import React from 'react';
import { useStore } from '../../lib/store';
import { Menu, X, Code, Sun, Moon, Search, Bell, User, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

const Header: React.FC = () => {
  const { 
    toggleSidebar, 
    sidebarOpen,
    theme,
    toggleTheme,
    currentUser,
    logout,
    setCurrentView
  } = useStore();

  const handleLogout = async () => {
    await logout();
    // The logout function in the store will reset authentication state
  };
  
  const handleToggleSidebar = () => {
    console.log("Toggling sidebar, current state:", sidebarOpen);
    toggleSidebar();
  };
  
  const goToDashboard = () => {
    console.log("Navigating to dashboard");
    setCurrentView('dashboard');
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <div className="flex items-center h-full px-4 w-full">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleToggleSidebar}
            icon={sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          />
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={goToDashboard}
          >
            <Code className="h-6 w-6 text-primary-600" />
            <span className="hidden font-semibold text-lg md:inline-block">CodeCraft</span>
          </div>
        </div>

        <div className="mx-4 flex-1 md:mx-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="search" 
              placeholder="Search challenges..." 
              className="w-full py-1.5 pl-10 pr-4 text-sm text-slate-900 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
            icon={theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          />
          <Button 
            variant="ghost" 
            size="sm"
            icon={<Bell size={18} />}
            aria-label="Notifications"
          />
          
          <div className="relative ml-2 flex items-center">
            {currentUser && (
              <div className="flex items-center gap-2">
                <span className="hidden text-sm font-medium md:inline-block">
                  {currentUser.name}
                </span>
                <Avatar 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  size="sm"
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="ml-2 text-red-500"
                  icon={<LogOut size={16} />}
                  aria-label="Log out"
                >
                  <span className="hidden md:inline-block">Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;