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

const App: React.FC = () => {
  const {
    sidebarOpen,
    currentChallenge,
    isAuthenticated,
    setUser,
    setAuthenticated,
  } = useStore()

  const [activeView, setActiveView] = useState<'dashboard' | 'challenges' | 'leaderboard'>('dashboard')
  const [loading, setLoading] = useState(true)

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      const session = data?.session

      console.log('🔍 Initial session check:', session)

      if (session?.user) {
        const user = session.user
        console.log('🔑 User found:', user)
        setUser({
          id: user.id,
          email: user.email ?? '',
          name: user.user_metadata.full_name ?? 'Unknown',
          avatar: user.user_metadata.avatar_url ?? '',
        })
        setAuthenticated(true)
      } else {
        console.log('🚫 No session found. Setting isAuthenticated = false')
        setUser(null)
        setAuthenticated(false)
      }

      setLoading(false)
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🌀 Auth state changed:', event, session)

      if (session?.user) {
        const user = session.user
        setUser({
          id: user.id,
          email: user.email ?? '',
          name: user.user_metadata.full_name ?? 'Unknown',
          avatar: user.user_metadata.avatar_url ?? '',
        })
        setAuthenticated(true)
      } else {
        setUser(null)
        setAuthenticated(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, setAuthenticated])

  // Log out function
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setAuthenticated(false)
    console.log('User logged out. Redirecting to homepage.')
  }

  useEffect(() => {
    if (currentChallenge) {
      setActiveView('challenges')
    }
  }, [currentChallenge])

  const handleViewChange = (view: 'dashboard' | 'challenges' | 'leaderboard') => {
    setActiveView(view)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-slate-500">Loading...</span>
      </div>
    )
  }

  // If user is not authenticated, show the LandingPage (login/signup)
  if (!isAuthenticated) {
    console.log('User is not authenticated. Redirecting to LandingPage.')
    return <LandingPage />
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar onViewChange={handleViewChange} />

      <div className={`flex min-h-screen w-full flex-col ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        <Header />

        {/* Log Out Button */}
        <button
          onClick={logout}
          className="p-2 mt-4 ml-4 text-white bg-red-600 rounded-md"
        >
          Log Out
        </button>

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
