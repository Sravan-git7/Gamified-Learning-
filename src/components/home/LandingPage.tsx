import { useState, useEffect } from "react";
import { Code } from "lucide-react";
import LoginModal from "../auth/LoginModal";
import SignupPage from "../auth/SignupPage";
import CodeAnimation from "./CodeAnimation";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoaded, setIsLoaded] = useState(false);

  // Effect to add the loaded class after component mounts for animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const openModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // If signup mode is active, show the full-page signup component
  if (isModalOpen && authMode === 'signup') {
    return <SignupPage onClose={closeModal} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500 opacity-5 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-purple-500 opacity-5 blur-[100px] rounded-full"></div>
      
      {/* Navigation Bar */}
      <header className="relative z-10 px-6 py-4 border-b border-gray-800">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 text-xl font-semibold">
            <Code className="text-blue-500" />
            <span>CodeCraft</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#product" className="text-gray-300 hover:text-white transition-colors">Product</a>
            <a href="#resources" className="text-gray-300 hover:text-white transition-colors">Resources</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#customers" className="text-gray-300 hover:text-white transition-colors">Customers</a>
            <a href="#blog" className="text-gray-300 hover:text-white transition-colors">Blog</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => openModal('login')} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={() => openModal('signup')} 
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Sign up
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 py-16 max-w-6xl">
        <h1 className={`text-5xl md:text-6xl font-bold mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          CodeCraft is a purpose-built tool for <span className="text-blue-500">mastering algorithms</span>
        </h1>
        
        <p className={`text-xl text-gray-400 mb-12 max-w-3xl transition-all duration-700 delay-[300ms] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Meet the platform for modern coding practice. Master data structures, algorithms, and prepare for technical interviews with real-world challenges.
        </p>
        
        <div className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-700 delay-[600ms] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors">
            Start building
          </button>
          <button className="text-gray-300 hover:text-white flex items-center transition-colors">
            Introducing CodeCraft for Teams →
          </button>
        </div>
      </main>

      {/* Code Editor Section with Animation */}
      <div className={`relative z-10 container mx-auto px-6 pb-20 transition-all duration-1000 delay-[900ms] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="rounded-lg overflow-hidden shadow-2xl shadow-blue-900/20 border border-gray-800 bg-gray-900">
          <div className="border-b border-gray-800 px-4 py-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-xs text-gray-400">quicksort.js</div>
          </div>
          
          <div className="grid grid-cols-12">
            {/* File explorer sidebar */}
            <div className="col-span-2 border-r border-gray-800 pt-2">
              <div className="px-2 py-1 text-xs text-blue-400 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                src
              </div>
              <div className="px-2 py-1 text-xs text-green-400 flex items-center pl-4">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                algorithms
              </div>
              <div className="px-2 py-1 text-xs text-white bg-gray-800 flex items-center pl-8">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                quicksort.js
              </div>
              <div className="px-2 py-1 text-xs text-gray-400 flex items-center pl-8">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                mergesort.js
              </div>
            </div>
            
            {/* Code editor with animation */}
            <div className="col-span-10 h-96">
              <CodeAnimation />
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isModalOpen && authMode === 'login' && (
        <LoginModal onClose={closeModal} />
      )}
    </div>
  );
};

export default LandingPage;
