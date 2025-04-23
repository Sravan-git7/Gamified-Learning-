import React, { useEffect, useState } from 'react'
import { useStore } from './lib/store'
import { supabase } from './lib/supabaseClient'

import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import ChallengeList from './components/features/ChallengeList'
import ChallengeDetail from './components/features/ChallengeDetail'
import Dashboard from './components/home/Dashboard'
import LeaderboardTable from './components/features/LeaderboardTable'
import LandingPage from './components/home/LandingPage'
import Lecture from './components/Pages/Lecture'
import LearningPaths from './components/Pages/Learningpaths'
import CommunityPage from './components/Pages/community'

function App() {
  const {
    sidebarOpen,
    currentChallenge,
    isAuthenticated,
    currentUser,
    currentView,
    setUser,
    setAuthenticated,
    setCurrentView,
  } = useStore()

  const [loading, setLoading] = useState(true)
  // Track whether we're showing the landing page initially
  const [initialLoad, setInitialLoad] = useState(true)

  // Reset any potentially corrupted state on initial load
  useEffect(() => {
    const clearAppState = () => {
      // Only for development - uncomment to clear persisted state
      // localStorage.removeItem('gamified-learning-storage')
      console.log('Initial app state:', { isAuthenticated, currentView, currentUser })
    }
    
    clearAppState()
  }, [])

  useEffect(() => {
    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error checking session:', error)
          setLoading(false)
          setInitialLoad(false)
          return
        }

        if (data.session) {
          // We have a valid session
          console.log('Found valid session, logging in user')
          const user = data.session.user
          setUser({
            id: user.id,
            email: user.email || '',
            name: user.user_metadata.full_name || 'User',
            avatar: user.user_metadata.avatar_url || '',
          })
          setAuthenticated(true)
          
          // If user is authenticated but on home view, set to dashboard
          if (currentView === 'home') {
            setCurrentView('dashboard')
          }
        } else {
          // No active session - show landing page
          console.log('No active session found, showing login page')
          setAuthenticated(false)
          setUser(null)
          setCurrentView('home')
        }
      } catch (err) {
        console.error('Session check error:', err)
      } finally {
        setLoading(false)
        setInitialLoad(false)
      }
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event)
        
        if (session) {
          const user = session.user
          setUser({
            id: user.id,
            email: user.email || '',
            name: user.user_metadata.full_name || 'User',
            avatar: user.user_metadata.avatar_url || '',
          })
          setAuthenticated(true)
          
          // If user just authenticated and still on home view, set to dashboard
          if (currentView === 'home') {
            setCurrentView('dashboard')
          }
        } else {
          setUser(null)
          setAuthenticated(false)
          setCurrentView('home')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [setUser, setAuthenticated, setCurrentView])

  useEffect(() => {
    if (currentChallenge) {
      setCurrentView('challenges')
    }
  }, [currentChallenge, setCurrentView])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="p-8 text-center">
          <div className="inline-block w-8 h-8 mb-4 border-4 border-blue-500 border-solid rounded-full animate-spin border-r-transparent"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // On initial load or when not authenticated, always show landing page
  if (initialLoad || !isAuthenticated) {
    console.log('Rendering landing page')
    return <LandingPage />
  }

  // If authenticated and view is home, show dashboard
  if (currentView === 'home' && isAuthenticated) {
    setCurrentView('dashboard')
  }
  
  console.log('Rendering main app with view:', currentView)

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {sidebarOpen && <Sidebar />}

      <div className={`flex min-h-screen w-full flex-col ${sidebarOpen ? 'md:ml-64' : ''}`}>
        <Header />

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'lectures' && <Lecture />}
            {currentView === 'learning' && <LearningPaths />}
            {currentView === 'challenges' &&
              (currentChallenge ? <ChallengeDetail /> : <ChallengeList />)}
            {currentView === 'leaderboard' && (
              <div className="flex flex-col gap-6">
                <h1 className="mb-2 text-2xl font-bold">Global Leaderboard</h1>
                <p className="text-slate-500 dark:text-slate-400">
                  Top coders by points and challenges solved
                </p>
                <LeaderboardTable />
              </div>
            )}
            {currentView === 'community' && <CommunityPage />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
