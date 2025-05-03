// src/home/LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { useStore } from '../../lib/store';
import { Code, ArrowRight, Terminal, Database, Shield } from 'lucide-react';
import Button from '../ui/Button';
import LoginModal from '../auth/LoginModal';
import SignupModal from '../auth/SignupPage';

const codeSnippets = {
  cleanCode: `// Example of clean, maintainable code
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[0];
  const left = [];
  const right = [];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,

  dataStructures: `class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  root: TreeNode | null = null;

  insert(value: number): void {
    const node = new TreeNode(value);
    
    if (!this.root) {
      this.root = node;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = node;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
      }
    }
  }
}`,

  security: `// Secure API endpoint with rate limiting
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
};

app.use('/api', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || !isValidApiKey(apiKey)) {
    return res.status(401).json({
      error: 'Invalid API key'
    });
  }

  // Validate request payload
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  next();
});`
};

const TypewriterEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <pre className="font-mono text-sm whitespace-pre overflow-x-auto">
      <code className="text-slate-100">{displayText}</code>
    </pre>
  );
};

const LandingPage: React.FC = () => {
  const { isAuthenticated, setCurrentView } = useStore();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false);
  };

  const openSignupModal = () => {
    setSignupModalOpen(true);
    setLoginModalOpen(false);
  };

  const closeModals = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(false);
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCurrentView('dashboard');
    } else {
      openSignupModal();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-white" />
              <span className="text-lg font-medium">Gradivo</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button className="text-sm text-slate-300 hover:text-orange-500 transition-colors">
                Product
              </button>
              <button className="text-sm text-slate-300 hover:text-orange-500 transition-colors">
                Resources
              </button>
              <button className="text-sm text-slate-300 hover:text-orange-500 transition-colors">
                Pricing
              </button>
              <button className="text-sm text-slate-300 hover:text-orange-500 transition-colors">
                Customers
              </button>
              <button className="text-sm text-slate-300 hover:text-orange-500 transition-colors">
                Blog
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={openLoginModal} className="text-sm text-slate-300 hover:text-orange-500 transition-colors">
                Log in
              </button>
              <Button onClick={openSignupModal} className="text-sm bg-white text-black hover:bg-slate-200">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight">
                Gradivo is a purpose-built tool for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                  {' '}mastering algorithms
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
                Meet the platform for modern coding practice. Master data structures, algorithms, and prepare for technical interviews with real-world challenges.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="bg-white text-black hover:bg-slate-200 px-8"
                >
                  Start building
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="text-slate-300 hover:text-white"
                  onClick={handleGetStarted}
                >
                  Introducing Gradivo for Teams →
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Feature Sections */}
        <div className="py-24 space-y-48">
          {/* Section 1: Code Animation */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-xl">
                  <Terminal className="w-5 h-5 text-blue-400" />
                  <span className="ml-2 text-blue-400 font-medium">Clean Code</span>
                </div>
                <h2 className="text-4xl font-bold">Write better code with real-time feedback</h2>
                <p className="text-lg text-slate-400">
                  Get instant feedback on your code quality, performance, and best practices. Our intelligent system helps you write cleaner, more efficient code.
                </p>
              </div>
              <div className="bg-gradient-to-br from-black/80 to-slate-900 rounded-lg p-6 border border-slate-800 shadow-lg shadow-black/20">
                <TypewriterEffect text={codeSnippets.cleanCode} />
              </div>
            </div>
          </div>

          {/* Section 2: Data Structures */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-black/80 to-slate-900 rounded-lg p-6 border border-slate-800 shadow-lg shadow-black/20">
                <TypewriterEffect text={codeSnippets.dataStructures} />
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center p-2 bg-green-500/10 rounded-xl">
                  <Database className="w-5 h-5 text-green-400" />
                  <span className="ml-2 text-green-400 font-medium">Data Structures</span>
                </div>
                <h2 className="text-4xl font-bold">Master complex data structures</h2>
                <p className="text-lg text-slate-400">
                  Learn and implement advanced data structures through hands-on practice. Build a strong foundation for technical interviews.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Security */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-xl">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <span className="ml-2 text-purple-400 font-medium">Best Practices</span>
                </div>
                <h2 className="text-4xl font-bold">Learn industry best practices</h2>
                <p className="text-lg text-slate-400">
                  Stay up-to-date with modern development practices and patterns. Build secure, scalable, and maintainable applications.
                </p>
              </div>
              <div className="bg-gradient-to-br from-black/80 to-slate-900 rounded-lg p-6 border border-slate-800 shadow-lg shadow-black/20">
                <TypewriterEffect text={codeSnippets.security} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
      </main>

      {/* Modals */}
      {isLoginModalOpen && (
        <LoginModal onClose={closeModals} onSwitchToSignup={openSignupModal} />
      )}
      {isSignupModalOpen && (
        <SignupModal onClose={closeModals} onSwitchToLogin={openLoginModal} />
      )}
    </div>
  );
};

export default LandingPage;
