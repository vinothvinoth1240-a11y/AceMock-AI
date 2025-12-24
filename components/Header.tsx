
import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div 
          onClick={onLogoClick}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-indigo-700 transition-colors">
            A
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">AceMock <span className="text-indigo-600">AI</span></span>
        </div>
        
        <div className="hidden sm:flex items-center space-x-6">
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>System Active</span>
          </div>
          <button 
            onClick={onLogoClick}
            className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors"
          >
            New Session
          </button>
        </div>
      </div>
    </header>
  );
};
