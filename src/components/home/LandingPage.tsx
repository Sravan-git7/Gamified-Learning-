import { useState, useEffect } from "react";
import { Code } from "lucide-react";
import LoginModal from "../auth/LoginModal";
import SignupPage from "../auth/SignupPage";
import CodeAnimation from "./CodeAnimation";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const openModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  if (isModalOpen && authMode === 'signup') {
    return <SignupPage onClose={closeModal} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-black">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500 opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-purple-500 opacity-10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm border-white/10">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Code className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-semibold">Gradivo</span>
            </div>
            <div className="items-center hidden gap-6 md:flex">
              <a 
                href="#product" 
                className="text-sm text-slate-300 transition-colors duration-200 hover:text-orange-400"
              >
                Product
              </a>
              <a 
                href="#resources" 
                className="text-sm text-slate-300 transition-colors duration-200 hover:text-orange-400"
              >
                Resources
              </a>
              <a 
                href="#pricing" 
                className="text-sm text-slate-300 transition-colors duration-200 hover:text-orange-400"
              >
                Pricing
              </a>
              <a 
                href="#customers" 
                className="text-sm text-slate-300 transition-colors duration-200 hover:text-orange-400"
              >
                Customers
              </a>
              <a 
                href="#blog" 
                className="text-sm text-slate-300 transition-colors duration-200 hover:text-orange-400"
              >
                Blog
              </a>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => openModal('login')} className="text-sm text-slate-300 hover:text-white">Log in</button>
              <button onClick={() => openModal('signup')} className="px-4 py-2 text-sm text-black bg-white rounded hover:bg-slate-200">Sign up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-4 pt-32 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Gradivo is a purpose-built tool for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400"> mastering algorithms</span>
          </h1>
          <p className={`mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Meet the platform for modern coding practice. Master data structures, algorithms, and prepare for technical interviews with real-world challenges.
          </p>
          <div className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button className="px-8 py-3 font-medium text-black bg-white rounded-md hover:bg-slate-200">Start building</button>
            <button className="text-slate-300 hover:text-white">Introducing Gradivo for Teams →</button>
          </div>
        </div>

        {/* Code Animation Section */}
        <div className="relative mt-32 overflow-hidden transition-all duration-1000 border rounded-xl border-white/10 delay-900">
          <CodeAnimation />
        </div>

        {/* Highlights */}
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
      </main>

      {/* Login Modal */}
      {isModalOpen && authMode === 'login' && (
        <LoginModal onClose={closeModal} />
      )}
    </div>
  );
};

export default LandingPage;
