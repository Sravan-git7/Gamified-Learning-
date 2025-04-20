import React, { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

function AuthPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        redirectTo: 'http://localhost:5173'  // Ensure this matches your Google redirect URI
      })

      if (error) {
        alert(`Error signing in with Google: ${error.message}`)
      }
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  const handleEmailSignup = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email })
    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for the confirmation link.')
    }
    setLoading(false)
  }

  return (
    <div>
      <h1>Sign Up</h1>
      
      {/* Google Signup Button */}
      <button
        onClick={handleGoogleSignup}
        className="p-2 text-white bg-blue-500 rounded"
      >
        Sign up with Google
      </button>
      
      {/* Email Signup */}
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button onClick={handleEmailSignup} disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up with Email'}
        </button>
      </div>
    </div>
  )
}

export default AuthPage
