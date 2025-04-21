import React, { useEffect } from 'react'
import { useStore } from './lib/store'
import { supabase } from './lib/supabaseClient'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import ChallengeList from './components/features/ChallengeList'
import ChallengeDetail from './components/features/ChallengeDetail'
import Dashboard from './components/home/Dashboard'
import LeaderboardTable from './components/features/LeaderboardTable'
import LandingPage from './components/home/LandingPage'

function App() {
  const { 
    sidebarOpen, 
    currentChallenge, 
    isAuthenticated,
    setUser,
    setAuthenticated
  } = useStore()
  
  const [activeView, setActiveView] = React.useState<'dashboard' | 'challenges' | 'leaderboard'>('dashboard')
  const [loading, setLoading] = React.useState(true)

  // Check for existing session on app load
  useEffect(() => {
    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error("Error checking session:", error)
          setLoading(false)
          return
        }
        
        if (data.session) {
          const user = data.session.user
          setUser({
            id: user.id,
            email: user.email || '',
            name: user.user_metadata.full_name || 'User',
            avatar: user.user_metadata.avatar_url || '',
          })
          setAuthenticated(true)
        }
      } catch (err) {
        console.error("Session check error:", err)
      } finally {
        setLoading(false)
      }
    }
    
    checkSession()
    
    // Also set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          const user = session.user
          setUser({
            id: user.id,
            email: user.email || '',
            name: user.user_metadata.full_name || 'User',
            avatar: user.user_metadata.avatar_url || '',
          })
          setAuthenticated(true)
        } else {
          setUser(null)
          setAuthenticated(false)
        }
      }
    )
    
    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, setAuthenticated])

  React.useEffect(() => {
    if (currentChallenge) {
      setActiveView('challenges')
    }
  }, [currentChallenge])

  const handleViewChange = (view: 'dashboard' | 'challenges' | 'leaderboard') => {
    setActiveView(view)
  }

  // Show loading state while checking for session
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-center p-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is not authenticated, show the landing page
  if (!isAuthenticated) {
    return <LandingPage />
  }

  // If user is authenticated, show the main app
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar onViewChange={handleViewChange} />

      <div className={`flex min-h-screen w-full flex-col ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        <Header />

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeView === 'dashboard' && <Dashboard />}

            {activeView === 'challenges' &&
              (currentChallenge ? <ChallengeDetail /> : <ChallengeList />)}

            {activeView === 'leaderboard' && (
              <div className="flex flex-col gap-6">
                <h1 className="mb-2 text-2xl font-bold">Global Leaderboard</h1>
                <p className="text-slate-500 dark:text-slate-400">
                  Top coders by points and challenges solved
                </p>
                <LeaderboardTable />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
