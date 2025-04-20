import React, { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) throw error
    } catch (error) {
      console.error('Error logging in with Google:', error)
    }
  }

  const handleEmailLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for the login link.')
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-semibold text-center text-gray-900 dark:text-white">Login</h1>

        <button
          onClick={handleGoogleLogin}
          className="w-full px-4 py-2 mb-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Log in with Google
        </button>

        <div className="mb-2 text-center text-gray-500 dark:text-gray-300">or</div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 mb-4 border rounded"
        />

        <button
          onClick={handleEmailLogin}
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900"
        >
          {loading ? 'Logging In...' : 'Log In with Email'}
        </button>
      </div>
    </div>
  )
}

export default LoginPage
