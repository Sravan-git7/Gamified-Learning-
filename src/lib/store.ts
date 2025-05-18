import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CHALLENGES } from './challenges';
import { supabase } from './supabaseClient';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  isAuthenticated: boolean;
  currentUser: User | null;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;

  challenges: typeof CHALLENGES;
  currentChallenge: typeof CHALLENGES[0] | null;
  setCurrentChallenge: (challengeId: string) => void;

  code: string;
  setCode: (code: string) => void;

  sidebarOpen: boolean;
  toggleSidebar: () => void;

  currentView: 'home' | 'dashboard' | 'lectures' | 'challenges' | 'leaderboard' | 'community' | 'learning';
  setCurrentView: (view: 'home' | 'dashboard' | 'lectures' | 'challenges' | 'leaderboard' | 'community' | 'learning') => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const initialTheme = storedTheme || systemTheme;

      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }

      return {
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

        isAuthenticated: false,
        currentUser: null,
        setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setUser: (user) => set({ currentUser: user }),
        logout: async () => {
          try {
            await supabase.auth.signOut();
            localStorage.removeItem('gamified-learning-storage');
            set({
              isAuthenticated: false,
              currentUser: null,
              currentChallenge: null,
              code: '',
              currentView: 'home',
            });
            window.location.reload();
          } catch (error) {
            console.error("Logout error:", error);
          }
        },

        challenges: CHALLENGES,
        currentChallenge: null,
        setCurrentChallenge: (challengeId) => {
          const challenge = CHALLENGES.find((c) => c.id === challengeId) || null;
          set({
            currentChallenge: challenge,
            code: challenge?.starterCode || '',
          });
        },

        code: '',
        setCode: (code) => set({ code }),

        sidebarOpen: true,
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

        currentView: 'home',
        setCurrentView: (view) => set({ currentView: view }),
      };
    },
    {
      name: 'gamified-learning-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        currentView: state.currentView,
        theme: state.theme,
      }),
    }
  )
);
