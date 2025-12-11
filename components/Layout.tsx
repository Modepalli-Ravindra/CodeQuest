import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LogOut, Star, User, Home, Map, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, progress, logout } = useStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!auth.isAuthenticated) {
    return <div className="min-h-screen bg-slate-950 flex flex-col">{children}</div>;
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-indigo-800 font-bold text-xl shadow-lg shrink-0">
            CQ
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">CodeQuest</h1>
        </div>

        <div className="space-y-2">
          <Link 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all text-white ${location.pathname === '/' ? 'bg-slate-800 shadow-inner' : 'hover:bg-slate-800/50'}`}
          >
            <Home size={20} /> Home
          </Link>
          <Link 
            to="/dashboard" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all text-white ${location.pathname === '/dashboard' ? 'bg-slate-800 shadow-inner' : 'hover:bg-slate-800/50'}`}
          >
            <Map size={20} /> Dashboard
          </Link>
        </div>
      </div>

      <div className="mt-8 md:mt-0 space-y-4">
         {/* User Stats Card */}
         <div className="bg-slate-800/80 p-4 rounded-xl">
           <div className="flex items-center gap-2 mb-2">
             <User size={16} className="text-slate-400" />
             <span className="font-medium text-sm text-slate-200 truncate">Explorer {auth.user}</span>
           </div>
           <div className="flex items-center gap-2 text-yellow-300 font-bold text-lg">
             <Star fill="currentColor" size={20} />
             <span>{progress.stars} Stars</span>
           </div>
         </div>
         
         {/* Actions */}
         <div className="flex gap-2">
           <button onClick={logout} className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-100 hover:text-white transition-colors text-sm">
             <LogOut size={16} /> Exit
           </button>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-slate-950 flex flex-col md:flex-row text-white">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-indigo-800 font-bold text-sm shadow-sm">
            CQ
          </div>
          <span className="font-bold text-lg">CodeQuest</span>
        </div>
        <button onClick={toggleMobileMenu} className="p-2 hover:bg-white/10 rounded-lg">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-slate-900 shadow-2xl p-4 z-50"
            onClick={e => e.stopPropagation()}
          >
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex w-64 bg-slate-900 text-white p-4 flex-col justify-between shadow-xl z-50 h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};