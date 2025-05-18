// src/components/auth/SignupPage.tsx
import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useStore } from '../../lib/store';

interface SignupPageProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onClose, onSwitchToLogin }) => {
  const { setAuthenticated, setUser, setCurrentView } = useStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: username },
        },
      });

      if (error) {
        alert(error.message);
      } else if (data.user) {
        // In a real app, you might want to wait for email verification
        // But for demo purposes, we'll log the user in immediately
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: username,
          avatar: '',
        });
        setAuthenticated(true);
        setCurrentView('dashboard');
        alert('Sign up successful! Welcome to the platform.');
      } else {
        alert('Check your email to confirm your signup!');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignup = async (provider: 'google' | 'github') => {
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
      <div className="bg-black rounded-lg shadow-lg w-full max-w-4xl flex">
        {/* Left side - Image area */}
        <div className="hidden md:block md:w-1/2">
          <img 
            src="/code-editor-preview.svg" 
            alt="Signup Illustration" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
            <p className="text-gray-400 text-sm mb-4">Sign up to get started</p>

            <form onSubmit={handleEmailSignup} className="space-y-3">
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <input
                type="password"
                placeholder="Create a password"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <div className="my-3 flex items-center">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="px-2 text-xs text-gray-500">Or continue with</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleOAuthSignup('google')}
                className="w-full p-2 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md transition duration-200"
              >
                <div className="mr-2">
                  <FaGoogle />
                </div>
                <span className="text-sm">Sign up with Google</span>
              </button>
              
              <button
                onClick={() => handleOAuthSignup('github')}
                className="w-full p-2 flex items-center justify-center bg-[#2b3137] hover:bg-[#24292e] text-white border border-gray-700 rounded-md transition duration-200"
              >
                <div className="mr-2">
                  <FaGithub />
                </div>
                <span className="text-sm">Sign up with GitHub</span>
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                Already have an account? <button onClick={onSwitchToLogin} className="text-blue-500 hover:underline">Sign in</button>
              </p>
            </div>

            <button onClick={onClose} className="mt-4 w-full text-xs text-gray-500 hover:text-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
