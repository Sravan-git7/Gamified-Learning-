// src/components/auth/AuthModal.tsx
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

function AuthModal({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSignup = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) alert(error.message);
    else alert('Check your email to confirm your signup!');
    setLoading(false);
  };

  const handleOAuthSignup = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        redirectTo: 'http://localhost:5173',
      });
      if (error) alert(`Error with ${provider}: ${error.message}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl flex">
        {/* Left side (you can add an image or design here later) */}
        <div className="w-1/2 bg-gray-200 dark:bg-gray-700 rounded-l-lg"></div>

        {/* Right side (form) */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-green-600 text-white p-2 rounded mb-4"
            onClick={handleEmailSignup}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>

          <div className="flex flex-col gap-2">
            <button
              className="w-full bg-blue-600 text-white p-2 rounded"
              onClick={() => handleOAuthSignup('google')}
            >
              Sign up with Google
            </button>
            <button
              className="w-full bg-gray-800 text-white p-2 rounded"
              onClick={() => handleOAuthSignup('github')}
            >
              Sign up with GitHub
            </button>
          </div>

          <button onClick={onClose} className="mt-4 w-full text-sm text-gray-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
