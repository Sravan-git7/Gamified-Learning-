import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useStore } from '../../lib/store';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const { setAuthenticated, setUser, setCurrentView } = useStore();
  const [message, setMessage] = useState<string>('Processing authentication...');
  const navigate = useNavigate();

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
          
          // Set authenticated state and current view
          setAuthenticated(true);
          setCurrentView('dashboard');
          
          // Successful authentication message
          setMessage('Authentication successful! Redirecting...');
          
          // Redirect to the dashboard using router navigate
          // Timeout to show the success message briefly
          setTimeout(() => {
            // Navigate to homepage but the dashboard will be shown since we set currentView
            navigate('/', { replace: true });
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
  }, [setAuthenticated, setUser, setCurrentView, navigate]);

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