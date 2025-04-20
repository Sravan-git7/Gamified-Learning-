import React from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Code, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const LandingPage: React.FC = () => {
  // Function to handle Google OAuth login/signup
  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Google sign-in error:', error.message);
    }
  };

  return (
    <div className="min-h-screen text-white bg-black">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm border-white/10">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Code className="w-6 h-6 text-white" />
              <span className="text-lg font-medium">CodeCraft</span>
            </div>
            <div className="items-center hidden gap-6 md:flex">
              <Button variant="ghost" className="text-sm text-slate-300 hover:text-white">
                Product
              </Button>
              <Button variant="ghost" className="text-sm text-slate-300 hover:text-white">
                Resources
              </Button>
              <Button variant="ghost" className="text-sm text-slate-300 hover:text-white">
                Pricing
              </Button>
              <Button variant="ghost" className="text-sm text-slate-300 hover:text-white">
                Customers
              </Button>
              <Button variant="ghost" className="text-sm text-slate-300 hover:text-white">
                Blog
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-sm text-slate-300 hover:text-white">
                Log in
              </Button>
              <Button 
                onClick={handleGoogleSignUp} 
                className="text-sm text-black bg-white hover:bg-slate-200"
              >
                Sign up with Google
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="relative">
          <div className="px-4 pt-32 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl">
                CodeCraft is a purpose-built tool for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                  {' '}mastering algorithms
                </span>
              </h1>
              <p className="max-w-3xl mt-6 text-lg sm:text-xl text-slate-400">
                Meet the platform for modern coding practice. Master data structures, algorithms, and prepare for technical interviews with real-world challenges.
              </p>
              <div className="flex items-center gap-4 mt-10">
                <Button 
                  size="lg" 
                  onClick={handleGoogleSignUp} 
                  className="px-8 text-black bg-white hover:bg-slate-200"
                >
                  Start building
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="text-slate-300 hover:text-white"
                  onClick={handleGoogleSignUp}
                >
                  Introducing CodeCraft for Teams → 
                </Button>
              </div>
            </div>

            <div className="relative mt-32 overflow-hidden border rounded-xl border-white/10">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/50 to-black" />
              <img 
                src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="CodeCraft Interface" 
                className="w-full h-auto"
              />
            </div>

            <div className="grid grid-cols-1 gap-8 mt-32 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="mb-2 text-lg font-medium">Built for developers</h3>
                <p className="text-slate-400">Powerful coding environment with support for multiple languages and real-time feedback.</p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium">Team collaboration</h3>
                <p className="text-slate-400">Share solutions, discuss approaches, and learn from the community.</p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium">Interview ready</h3>
                <p className="text-slate-400">Practice with challenges sourced from real technical interviews.</p>
              </div>
            </div>
          </div>

          {/* Place the gradient background div here */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
