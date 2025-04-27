// src/components/auth/LoginModal.tsx
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useStore } from '../../lib/store';

function LoginModal({ onClose, onSwitchToSignup }: { onClose: () => void; onSwitchToSignup: () => void }) {
  const { setAuthenticated, setUser, setCurrentView } = useStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        alert(error.message);
      } else if (data.user) {
        // Login successful, update the store
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: username || data.user.user_metadata.full_name || 'User',
          avatar: data.user.user_metadata.avatar_url || '',
        });
        setAuthenticated(true);
        setCurrentView('dashboard');
        alert('Login successful! Welcome back.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) alert(`Error with ${provider}: ${error.message}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl flex">
        {/* Left half with illustration */}
        <div className="hidden md:block w-1/2 bg-gray-200 dark:bg-gray-700 rounded-l-lg overflow-hidden">
          <div className="h-full flex items-center justify-center bg-blue-600 bg-opacity-10">
            <img 
              src="/code-editor-preview.svg" 
              alt="Code illustration" 
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        </div>

        {/* Right half (Login Form) */}
        <div className="w-full md:w-1/2 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center dark:text-white">Log In</h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-2.5 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2.5 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2.5 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-md mb-3 transition-colors"
            onClick={handleEmailLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <div className="my-3 flex items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-2 text-xs text-gray-500">Or continue with</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              className="w-full bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300 transition-colors flex items-center justify-center"
              onClick={() => handleOAuthLogin('google')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm">Log in with Google</span>
            </button>
            <button
              className="w-full bg-[#2b3137] hover:bg-[#24292e] text-white p-2 rounded-md transition-colors flex items-center justify-center"
              onClick={() => handleOAuthLogin('github')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.83-.26.83-.58 0-.28 0-1.03-.02-2.03-3.33.72-4.03-1.6-4.03-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.08-.72.08-.72 1.2.08 1.84 1.23 1.84 1.23 1.07 1.84 2.8 1.3 3.5 1 .1-.77.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.3.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23.96-.26 1.98-.4 3-.4 1.02 0 2.04.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.63 1.66.23 2.88.12 3.18.77.84 1.23 1.9 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.42.36.8 1.1.8 2.2v3.3c0 .3.2.67.82.56C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12" />
              </svg>
              <span className="text-sm">Log in with GitHub</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <button onClick={onSwitchToSignup} className="text-blue-600 hover:underline">
                Sign Up
              </button>
            </p>
          </div>

          <button onClick={onClose} className="mt-4 w-full text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
