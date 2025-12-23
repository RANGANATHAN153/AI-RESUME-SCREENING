
import React, { useState } from 'react';
import { ViewType, Candidate } from './types';
import { rawCandidateData } from './data';
import Dashboard from './components/Dashboard';
import CandidateList from './components/CandidateList';
import AIAnalyst from './components/AIAnalyst';
import Predictor from './components/Predictor';
import { LayoutDashboard, Users, BrainCircuit, Microscope } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [candidates] = useState<Candidate[]>(rawCandidateData);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard candidates={candidates} />;
      case 'candidates':
        return <CandidateList candidates={candidates} />;
      case 'ai-analyst':
        return <AIAnalyst candidates={candidates} />;
      case 'predictor':
        return <Predictor />;
      default:
        return <Dashboard candidates={candidates} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">ResumeAI</h1>
          </div>
          <p className="text-slate-400 text-xs mt-1">Intelligence Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeView === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveView('candidates')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeView === 'candidates' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users size={20} />
            <span className="font-medium">Candidate Pool</span>
          </button>
          
          <button
            onClick={() => setActiveView('ai-analyst')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeView === 'ai-analyst' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Microscope size={20} />
            <span className="font-medium">AI Analyst</span>
          </button>

          <button
            onClick={() => setActiveView('predictor')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeView === 'predictor' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BrainCircuit size={20} />
            <span className="font-medium">Predictive Model</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 text-slate-500 text-[10px] text-center uppercase tracking-widest">
          v2.5 Enterprise Edition
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            {activeView.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">HR Analytics Lead</span>
              <span className="text-xs text-green-500 font-semibold">Live System Access</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
              AD
            </div>
          </div>
        </header>
        
        <div className="p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;

// Helper: lucide-react doesn't exist in environment, we'll mock simple SVG icons in components or use strings.
// Actually I should define the icons or use standard SVG. Let's use standard SVG paths for safety.
