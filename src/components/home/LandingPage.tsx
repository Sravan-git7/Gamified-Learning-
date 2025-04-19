import React from 'react';
import { useStore } from '../../lib/store';
import { Code, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const LandingPage: React.FC = () => {
  const { login } = useStore();

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-white" />
              <span className="text-lg font-medium">CodeCraft</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
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
              <Button variant="ghost" onClick={login} className="text-sm text-slate-300 hover:text-white">
                Log in
              </Button>
              <Button onClick={login} className="text-sm bg-white text-black hover:bg-slate-200">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight">
                CodeCraft is a purpose-built tool for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                  {' '}mastering algorithms
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl">
                Meet the platform for modern coding practice. Master data structures, algorithms, and prepare for technical interviews with real-world challenges.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <Button 
                  size="lg" 
                  onClick={login} 
                  className="bg-white text-black hover:bg-slate-200 px-8"
                >
                  Start building
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="text-slate-300 hover:text-white"
                  onClick={login}
                >
                  Introducing CodeCraft for Teams →
                </Button>
              </div>
            </div>

            <div className="mt-32 relative rounded-xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />
              <img 
                src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="CodeCraft Interface" 
                className="w-full h-auto"
              />
            </div>

            <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="text-lg font-medium mb-2">Built for developers</h3>
                <p className="text-slate-400">Powerful coding environment with support for multiple languages and real-time feedback.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Team collaboration</h3>
                <p className="text-slate-400">Share solutions, discuss approaches, and learn from the community.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Interview ready</h3>
                <p className="text-slate-400">Practice with challenges sourced from real technical interviews.</p>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;