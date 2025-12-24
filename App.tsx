
import React, { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { InterviewDashboard } from './components/InterviewDashboard';
import { Header } from './components/Header';
import { UserProfile, InterviewData } from './types';
import { generateInterviewContent } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'onboarding' | 'loading' | 'dashboard'>('onboarding');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('Initializing AI Architect...');

  const handleStartInterview = async (userProfile: UserProfile) => {
    setProfile(userProfile);
    setView('loading');
    
    const messages = [
      "Analyzing job market requirements...",
      "Synthesizing role-specific challenges...",
      "Calibrating difficulty parameters...",
      "Generating professional assessment patterns...",
      "Finalizing your personalized evaluation kit..."
    ];
    
    let msgIndex = 0;
    const interval = setInterval(() => {
      setLoadingMessage(messages[msgIndex % messages.length]);
      msgIndex++;
    }, 1500);

    try {
      const data = await generateInterviewContent(userProfile);
      setInterviewData(data);
      setView('dashboard');
    } catch (error) {
      console.error("Failed to generate content", error);
      alert("Error generating interview content. Please check your connection or try again.");
      setView('onboarding');
    } finally {
      clearInterval(interval);
    }
  };

  const handleRestart = () => {
    setView('onboarding');
    setProfile(null);
    setInterviewData(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100">
      <Header onLogoClick={handleRestart} />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {view === 'onboarding' && (
          <Onboarding onSubmit={handleStartInterview} />
        )}

        {view === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in fade-in duration-500">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Preparing Your Interview</h2>
              <p className="text-slate-500 italic animate-pulse">{loadingMessage}</p>
            </div>
          </div>
        )}

        {view === 'dashboard' && interviewData && profile && (
          <InterviewDashboard 
            data={interviewData} 
            profile={profile} 
            onRestart={handleRestart}
          />
        )}
      </main>

      <footer className="mt-auto py-8 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <p>© 2024 AceMock AI. Deployed for professional skill evaluation.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Enterprise Quality</span>
            <span>Real-time Synthesis</span>
            <span>Adaptive Intelligence</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
