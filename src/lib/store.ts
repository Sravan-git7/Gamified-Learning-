import { create } from 'zustand';
import { CHALLENGES } from './challenges';
import { CURRENT_USER } from './users';

interface AppState {
  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Auth
  isAuthenticated: boolean;
  currentUser: typeof CURRENT_USER | null;
  login: () => void;
  logout: () => void;

  // Challenges
  challenges: typeof CHALLENGES;
  currentChallenge: typeof CHALLENGES[0] | null;
  setCurrentChallenge: (challengeId: string) => void;

  // Code editor
  code: string;
  setCode: (code: string) => void;
  
  // UI state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<AppState>((set) => {
  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initialTheme = savedTheme || systemTheme;
  
  // Apply initial theme to document
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }

  return {
    // Theme
    theme: initialTheme,
    setTheme: (theme) => {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      set({ theme });
    },
    toggleTheme: () => {
      set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { theme: newTheme };
      });
    },

    // Auth
    isAuthenticated: false, // Changed to false by default
    currentUser: null, // Changed to null by default
    login: () => set({ isAuthenticated: true, currentUser: CURRENT_USER }),
    logout: () => set({ isAuthenticated: false, currentUser: null }),

    // Challenges
    challenges: CHALLENGES,
    currentChallenge: null,
    setCurrentChallenge: (challengeId) => {
      const challenge = CHALLENGES.find((c) => c.id === challengeId) || null;
      set({ 
        currentChallenge: challenge,
        code: challenge?.starterCode || ''
      });
    },

    // Code editor
    code: '',
    setCode: (code) => set({ code }),
    
    // UI state
    sidebarOpen: true,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  };
});