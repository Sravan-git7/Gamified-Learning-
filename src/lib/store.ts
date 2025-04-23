import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CHALLENGES } from './challenges'
import { supabase } from './supabaseClient'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AppState {
  // Theme
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void

  // Auth
  isAuthenticated: boolean
  currentUser: User | null
  setAuthenticated: (isAuthenticated: boolean) => void
  setUser: (user: User | null) => void
  logout: () => Promise<void>

  // Challenges
  challenges: typeof CHALLENGES
  currentChallenge: typeof CHALLENGES[0] | null
  setCurrentChallenge: (challengeId: string) => void

  // Code editor
  code: string
  setCode: (code: string) => void

  // UI state
  sidebarOpen: boolean
  toggleSidebar: () => void
  
  // Navigation
  currentView: 'home' | 'dashboard' | 'lectures' | 'challenges' | 'leaderboard' | 'community' | 'learning'
  setCurrentView: (view: 'home' | 'dashboard' | 'lectures' | 'challenges' | 'leaderboard' | 'community' | 'learning') => void
}

// Use persist middleware to store state in localStorage
export const useStore = create<AppState>()(
  persist(
    (set) => {
      // Initialize theme from localStorage or system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      const initialTheme = systemTheme

      // Apply initial theme to document
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark')
      }

      return {
        // Theme
        theme: initialTheme,
        setTheme: (theme) => {
          localStorage.setItem('theme', theme)
          if (theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          set({ theme })
        },
        toggleTheme: () => {
          set((state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', newTheme)
            if (newTheme === 'dark') {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
            return { theme: newTheme }
          })
        },

        // Auth
        isAuthenticated: false,
        currentUser: null,
        setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setUser: (user) => set({ currentUser: user }),
        logout: async () => {
          try {
            await supabase.auth.signOut()
            localStorage.removeItem('gamified-learning-storage')
            set({
              isAuthenticated: false,
              currentUser: null,
              currentChallenge: null,
              code: '',
              currentView: 'home'
            })
            // Force reload the page to clear any remaining state
            window.location.href = '/'
          } catch (error) {
            console.error("Logout error:", error)
          }
        },

        // Challenges
        challenges: CHALLENGES,
        currentChallenge: null,
        setCurrentChallenge: (challengeId) => {
          const challenge = CHALLENGES.find((c) => c.id === challengeId) || null
          set({
            currentChallenge: challenge,
            code: challenge?.starterCode || '',
          })
        },

        // Code editor
        code: '',
        setCode: (code) => set({ code }),

        // UI state
        sidebarOpen: true,
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        
        // Navigation
        currentView: 'home',
        setCurrentView: (view) => set({ currentView: view }),
      }
    },
    {
      name: 'gamified-learning-storage', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        currentView: state.currentView,
        theme: state.theme,
      }),
    }
  )
)