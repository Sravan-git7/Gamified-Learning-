import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useStore } from '../../lib/store';

const AuthCallback = () => {
  const { setAuthenticated, setUser } = useStore();
  const [message, setMessage] = useState<string>('Processing authentication...');

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error during auth callback:', error);
          setMessage('Authentication failed. Please try again.');
          return;
        }

        if (data.session) {
          const user = data.session.user;
          
          // Set user data in the store
          setUser({
            id: user.id,
            email: user.email || '',
            name: user.user_metadata.full_name || 'User',
            avatar: user.user_metadata.avatar_url || '',
          });
          
          // Set authenticated state
          setAuthenticated(true);
          
          // Successful authentication message
          setMessage('Authentication successful! Redirecting...');
          
          // Redirect to the dashboard or home page after a short delay
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else {
          setMessage('No active session found. Please try logging in again.');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setMessage('An error occurred during authentication.');
      }
    };

    handleAuthCallback();
  }, [setAuthenticated, setUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="text-center p-8 rounded-lg bg-gray-800">
        <h1 className="text-2xl font-bold text-white mb-4">{message}</h1>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
      </div>
    </div>
  );
};

export default AuthCallback; 